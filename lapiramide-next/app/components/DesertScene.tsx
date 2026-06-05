"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ------------- Texture di arenaria generata al volo (no asset) ------------ */
function makeSandstone(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d")!;
  // base sabbia
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#d9b676");
  g.addColorStop(1, "#b88e4f");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  // grana / puntinatura
  for (let i = 0; i < 70000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const s = Math.random() * 60 - 30;
    ctx.fillStyle = `rgba(${150 + s},${120 + s},${70 + s},0.12)`;
    ctx.fillRect(x, y, 1.6, 1.6);
  }
  // corsi di blocchi orizzontali (effetto mattoni di pietra)
  for (let y = 0; y < 512; y += 30) {
    ctx.fillStyle = "rgba(70,48,18,0.28)";
    ctx.fillRect(0, y, 512, 2);
    // giunti verticali sfalsati
    const off = (y / 30) % 2 === 0 ? 0 : 64;
    for (let x = off; x < 512; x += 128) {
      ctx.fillStyle = "rgba(70,48,18,0.20)";
      ctx.fillRect(x, y, 2, 30);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 2);
  t.anisotropy = 4;
  return t;
}

/* --------------------------- Piramide di pietra --------------------------- */
function Pyramid({
  position,
  scale = 1,
  spin = 0.05,
  map,
}: {
  position: [number, number, number];
  scale?: number;
  spin?: number;
  map: THREE.Texture;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const y = (1.7 * scale) / 2;
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.PI / 4 + s.clock.elapsedTime * spin;
  });
  return (
    <mesh ref={ref} position={[position[0], y, position[2]]} scale={scale} castShadow>
      <coneGeometry args={[1.3, 1.7, 4]} />
      <meshStandardMaterial
        map={map}
        bumpMap={map}
        bumpScale={0.08}
        color="#d8b87a"
        metalness={0}
        roughness={0.95}
        flatShading
      />
    </mesh>
  );
}

/* ---------------------- Sole con bagliore (senza post) -------------------- */
function Sun() {
  const halo = (r: number, color: string, opacity: number) => (
    <mesh>
      <circleGeometry args={[r, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
  return (
    <group position={[-2.2, 3.1, -11]}>
      {halo(8, "#c98b3a", 0.1)}
      {halo(5, "#e0a94a", 0.18)}
      {halo(3, "#ffcf86", 0.4)}
      <mesh>
        <circleGeometry args={[1.8, 64]} />
        <meshBasicMaterial color="#ffe9b0" />
      </mesh>
    </group>
  );
}

/* --------------------- Volantino che vola (volantinaggio) ------------------ */
function Flyer() {
  const ref = useRef<THREE.Mesh>(null!);
  const d = useMemo(
    () => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 8 - 1,
      z: (Math.random() - 0.5) * 7 - 1,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      speed: 0.5 + Math.random() * 0.7,
      sway: Math.random() * 6,
    }),
    []
  );
  useFrame((s, delta) => {
    const m = ref.current;
    if (!m) return;
    m.position.y += delta * d.speed;
    m.position.x += Math.sin(s.clock.elapsedTime * 0.5 + d.sway) * delta * 0.5;
    m.rotation.x += delta * 0.9;
    m.rotation.y += delta * 1.2;
    if (m.position.y > 7.5) {
      m.position.y = -1.5;
      m.position.x = (Math.random() - 0.5) * 16;
    }
  });
  return (
    <mesh ref={ref} position={[d.x, d.y, d.z]} rotation={[d.rx, d.ry, 0]}>
      <planeGeometry args={[0.34, 0.46]} />
      <meshStandardMaterial
        color="#f6ead0"
        roughness={0.85}
        metalness={0}
        side={THREE.DoubleSide}
        emissive="#8a6a26"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

/* ----------------------------- Camera dolce ------------------------------- */
function CameraRig() {
  useFrame((s) => {
    const t = s.clock.elapsedTime * 0.12;
    s.camera.position.x = Math.sin(t) * 1.8;
    s.camera.position.y = 2.4 + Math.sin(t * 0.6) * 0.25;
    s.camera.lookAt(0, 1.3, 0);
  });
  return null;
}

/* -------------------------------- Scena ----------------------------------- */
export default function DesertScene() {
  const flyers = useMemo(() => Array.from({ length: 18 }), []);
  const sand = useMemo(() => makeSandstone(), []);
  return (
    <Canvas camera={{ position: [0, 2.4, 9], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#0c0a07"]} />
      <fog attach="fog" args={["#1a120a", 11, 34]} />

      <CameraRig />

      <ambientLight intensity={0.5} color="#ffd9a0" />
      <directionalLight position={[-4, 5, -6]} intensity={3} color="#ffce86" />
      <pointLight position={[3, 2.5, 4]} intensity={12} distance={24} color="#ffd27a" />

      <Sun />

      <group position={[0, -0.6, 0]}>
        <Pyramid position={[0, 0, 0]} scale={1.55} spin={0.04} map={sand} />
        <Pyramid position={[-3.1, 0, -1.6]} scale={1.0} spin={0.06} map={sand} />
        <Pyramid position={[2.9, 0, -1.1]} scale={1.2} spin={-0.05} map={sand} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#241a10" roughness={1} metalness={0} />
        </mesh>
      </group>

      <Sparkles
        count={130}
        scale={[20, 9, 10]}
        position={[0, 3, 0]}
        size={3}
        speed={0.3}
        opacity={0.7}
        color="#ffdf9e"
      />

      {flyers.map((_, i) => (
        <Flyer key={i} />
      ))}
    </Canvas>
  );
}
