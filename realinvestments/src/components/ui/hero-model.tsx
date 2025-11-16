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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0.2, 1.5, 9);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(6, 10, 6);
    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.8);
    rimLight.position.set(-8, 3, -6);

    scene.add(ambientLight, keyLight, rimLight);

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
              color: 0xe8f6ff,
              metalness: 0.15,
              roughness: 0.65,
              emissive: new THREE.Color(0x0b1628),
              emissiveIntensity: 0.08,
            });
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 2.6;
        const scale = maxDimension ? targetSize / maxDimension : 1;
        object.scale.setScalar(scale);

        boundingBox.setFromObject(object);
        const center = boundingBox.getCenter(new THREE.Vector3());
        object.position.sub(center);
        object.position.y -= 0.15;

        model = object;
        scene.add(object);
      },
      undefined,
      () => {
        // eslint-disable-next-line no-console
        console.warn("Failed to load varketili.obj");
      }
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

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const elapsed = clock.getElapsedTime();

      if (model) {
        model.rotation.y += 0.0025;
        model.rotation.x = Math.sin(elapsed * 0.3) * 0.05;
        model.position.y = Math.sin(elapsed * 0.6) * 0.15 - 0.5;
      }

      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
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
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/10 to-neutral-950/80" />
    </div>
  );
}

