"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export function HeroModelBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xf6f7ff, 0x040404, 0.55);
    hemiLight.position.set(0, 2, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(6, 5.5, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0002;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(-5, -2, -5.5);
    scene.add(rimLight);

    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    const fillLight = new THREE.PointLight(0xfff0d5, 0.4, 32);
    fillLight.position.set(-1.6, 1.2, 3.4);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(0xffffff, 1.6, 9);
    accentLight.position.set(0.25, 0.55, 1.2);
    objectGroup.add(accentLight);

    const bounceLight = new THREE.PointLight(0xfff0d5, 0.65, 20);
    bounceLight.position.set(0, -1.6, 2);
    scene.add(bounceLight);

    const spotLight = new THREE.SpotLight(
      0xfefefe,
      1.25,
      30,
      Math.PI / 4.2,
      0.35
    );
    spotLight.position.set(0.2, 0.8, 2.1);
    spotLight.target = objectGroup;
    scene.add(spotLight);
    scene.add(spotLight.target);

    const backSpot = new THREE.SpotLight(
      0xb7c9ff,
      0.7,
      25,
      Math.PI / 3.2,
      0.65
    );
    backSpot.position.set(-3.8, 3.2, -5.5);
    backSpot.target = objectGroup;
    scene.add(backSpot);
    scene.add(backSpot.target);

    let model: THREE.Object3D | null = null;
    let disposed = false;

    const loader = new OBJLoader();

    loader.load(
      "/models/varketili.obj",
      (object) => {
        if (disposed) {
          return;
        }

        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0x1c1c1c,
              metalness: 0.35,
              roughness: 0.45,
              envMapIntensity: 1.1,
            });
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.8;
        const scale = targetSize / maxDimension;
        object.scale.setScalar(scale);

        boundingBox.setFromObject(object);
        const center = boundingBox.getCenter(new THREE.Vector3());
        object.position.sub(center);
        objectGroup.add(object);
        model = object;
      },
      undefined,
      () => {}
    );

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) {
        return;
      }
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    handleResize();

    const handleWindowResize = () => handleResize();
    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleWindowResize);
    }

    let timelineProgress = 0;
    const SCROLL_SENSITIVITY = 1.6;
    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(Math.max(value, min), max);

    const updateScrollProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      timelineProgress = clamp(progress, 0, 1);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        clamp(progress * SCROLL_SENSITIVITY).toString()
      );
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    renderer.setAnimationLoop(() => {
      const easedProgress = THREE.MathUtils.smoothstep(timelineProgress, 0, 1);

      // Two-phase scroll animation with a buffer:
      // Phase 1: travel across and ease into the center.
      // Buffer: hold centered position briefly while the user keeps scrolling.
      // Phase 2: only near the very end, push the model further away in depth.
      const phase1End = 0.8;
      const phase2Start = 0.9;
      const phase1 = clamp(easedProgress / phase1End);
      const phase2 = clamp(
        (easedProgress - phase2Start) / (1 - phase2Start || 1)
      );

      const phase1StartX = 2.3; // right side
      const phase1EndX = -2.3; // left side by end of phase 1
      const phase1StartZ = 0.1;
      const phase1EndZ = -1.4;

      let posX = THREE.MathUtils.lerp(phase1StartX, phase1EndX, phase1);
      let posZ = THREE.MathUtils.lerp(phase1StartZ, phase1EndZ, phase1);

      // Phase 2: move from left side into the center and slightly further away
      const phase2TargetX = 0; // center of screen
      const phase2TargetZ = -3.5;

      posX = THREE.MathUtils.lerp(posX, phase2TargetX, phase2);
      posZ = THREE.MathUtils.lerp(posZ, phase2TargetZ, phase2);

      objectGroup.position.x = posX;
      objectGroup.position.z = posZ;

      const baseRotationY = THREE.MathUtils.degToRad(189);
      const centeredRotationY = THREE.MathUtils.degToRad(10);
      objectGroup.rotation.y = THREE.MathUtils.lerp(
        baseRotationY * easedProgress,
        centeredRotationY,
        phase2
      );
      objectGroup.rotation.x = THREE.MathUtils.degToRad(-5 * easedProgress);

      fillLight.position.x = objectGroup.position.x - 0.8;
      fillLight.position.z = objectGroup.position.z + 1.2;
      spotLight.position.x = objectGroup.position.x * 0.3;
      spotLight.position.z = objectGroup.position.z + 0.9;
      spotLight.target.position.copy(objectGroup.position);
      backSpot.target.position.copy(objectGroup.position);

      if (model) {
        const idleBase = THREE.MathUtils.degToRad(25);
        const idleAmplitude = THREE.MathUtils.degToRad(5);
        model.rotation.y =
          idleBase + idleAmplitude * Math.sin(performance.now() * 0.0003);
      }

      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      window.removeEventListener("scroll", updateScrollProgress);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleWindowResize);
      }
      renderer.setAnimationLoop(null);
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-neutral-950/70 via-neutral-950/10 to-neutral-950/80" />
    </div>
  );
}
