"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface LocationModelProps {
  progress: number;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export function LocationModel({ progress }: LocationModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = clamp(progress ?? 0);
  }, [progress]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
      });
    } catch (error) {
      console.warn("WebGL context creation failed:", error);
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.3, 5.4);

    const objectGroup = new THREE.Group();
    objectGroup.position.set(1.2, -0.45, 1.4);
    scene.add(objectGroup);

    // Lighting: base ambient + a single soft key from the right
    const ambientLight = new THREE.AmbientLight(0x7fc7ff, 7.5);
    scene.add(ambientLight);

    const rightSoftLight = new THREE.DirectionalLight(0xffffff, 2.1);
    // x>0 = right side, y>0 = above, z>0 = towards the camera
    rightSoftLight.position.set(10, 3, 2);
    scene.add(rightSoftLight);

    const scrollLight = new THREE.PointLight(0x7fc7ff, 0.9, 10);
    scrollLight.position.set(0.4, -1.2, -0.2);
    scene.add(scrollLight);

    const loader = new OBJLoader();

    let model: THREE.Object3D | null = null;
    let disposed = false;

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
              color: 0x171717,
              metalness: 0.4,
              roughness: 0.5,
            });
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.4;
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
      if (!container) {
        return;
      }
      const { clientWidth, clientHeight } = container;

      if (clientWidth === 0 || clientHeight === 0) {
        return;
      }

      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    handleResize();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => handleResize())
        : null;

    if (resizeObserver) {
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    renderer.setAnimationLoop(() => {
      const rawProgress = progressRef.current;
      const eased = THREE.MathUtils.smoothstep(rawProgress, 0, 1);

      const travelPhase = clamp(eased / 0.5);
      const settlePhase = clamp((eased - 0.55) / 0.45);

      let posX = THREE.MathUtils.lerp(1.2, -2.1, travelPhase);
      posX = THREE.MathUtils.lerp(posX, 0, settlePhase);
      const posZ = THREE.MathUtils.lerp(1.4, -0.9, eased);
      const posY =
        THREE.MathUtils.lerp(-0.2, 0.06, eased) +
        Math.sin(performance.now() * 0.0012) * 0.05;

      objectGroup.position.set(posX, posY, posZ);

      const baseRotationY = THREE.MathUtils.degToRad(90);
      const edgeRotationY = THREE.MathUtils.degToRad(-40);
      const finalRotationY = THREE.MathUtils.degToRad(10);
      const rotationY = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(baseRotationY, edgeRotationY, travelPhase),
        finalRotationY,
        settlePhase
      );

      objectGroup.rotation.set(
        THREE.MathUtils.degToRad(-12 + 8 * eased),
        rotationY,
        THREE.MathUtils.degToRad((travelPhase - settlePhase) * 6)
      );

      scrollLight.position.x = THREE.MathUtils.lerp(0.4, -0.1, settlePhase);

      if (model) {
        model.rotation.y =
          THREE.MathUtils.degToRad(5) +
          Math.sin(performance.now() * 0.0009) * 0.25 +
          settlePhase * 0.4;
      }

      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
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
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
    </div>
  );
}

