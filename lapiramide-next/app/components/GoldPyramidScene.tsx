"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

type Scroll = { get: () => number } | undefined;

function GoldPyramid({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[1.3, 1.9, 4]} />
      <meshStandardMaterial
        color="#caa14a"
        metalness={1}
        roughness={0.22}
        envMapIntensity={1.5}
        emissive="#2a1d07"
        emissiveIntensity={0.25}
        flatShading
      />
    </mesh>
  );
}

function Pyramids() {
  const g = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.1;
  });
  const baseY = -0.95;
  const cy = (s: number) => baseY + (1.9 * s) / 2;
  return (
    <group ref={g}>
      <GoldPyramid position={[0, cy(1.35), 0]} scale={1.35} />
      <GoldPyramid position={[-2.4, cy(0.85), -1.2]} scale={0.85} />
      <GoldPyramid position={[2.3, cy(1.0), -0.9]} scale={1.0} />
    </group>
  );
}

/* Camera guidata dallo SCROLL: vola dentro la scena (immersione) */
function Rig({ scroll }: { scroll: Scroll }) {
  useFrame((s) => {
    const p = scroll ? Math.min(Math.max(scroll.get(), 0), 1) : 0;
    const t = s.clock.elapsedTime;
    const sway = (1 - p) * 0.7; // l'ondeggio si calma mentre entri
    const z = 7 - p * 5.4; // 7 (largo) -> 1.6 (dentro)
    const y = 1.4 - p * 0.55;
    s.camera.position.set(Math.sin(t * 0.15) * sway, y + Math.sin(t * 0.5) * 0.12 * (1 - p), z);
    s.camera.lookAt(0, 0.6 + p * 0.55, 0);
  });
  return null;
}

export default function GoldPyramidScene({ scroll }: { scroll?: Scroll }) {
  return (
    <Canvas shadows camera={{ position: [0, 1.4, 7], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 24]} />

      <Rig scroll={scroll} />

      <ambientLight intensity={0.18} />
      <spotLight position={[4, 8, 5]} angle={0.5} penumbra={1} intensity={60} color="#ffe9b0" castShadow />
      <pointLight position={[-5, 3, -3]} intensity={10} color="#caa14a" />
      <pointLight position={[0, 1, 6]} intensity={6} color="#ffd27a" />

      <Environment resolution={256}>
        <Lightformer intensity={3} color="#ffe9b0" position={[0, 4, -4]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.6} color="#ffffff" position={[-5, 2, 2]} scale={[3, 4, 1]} />
        <Lightformer intensity={1.4} color="#d4af37" position={[5, 1, -2]} scale={[3, 4, 1]} />
        <Lightformer intensity={2} color="#ffd27a" position={[0, -2, 4]} scale={[8, 2, 1]} />
      </Environment>

      <Pyramids />

      <Sparkles count={70} scale={[12, 6, 8]} position={[0, 1.5, 0]} size={3} speed={0.25} opacity={0.6} color="#ffdf9e" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          resolution={1024}
          blur={[300, 120]}
          mixBlur={1}
          mixStrength={50}
          roughness={0.85}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#070707"
          metalness={0.7}
        />
      </mesh>
    </Canvas>
  );
}
