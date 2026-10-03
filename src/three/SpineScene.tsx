"use client";

import { PresentationControls } from "@react-three/drei";
import { Canvas, invalidate, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RegionId } from "@/content/regions";

// Procedural spine: 7 cervical, 12 thoracic, 5 lumbar vertebrae, sacrum and coccyx on a natural S-curve.
// (promptP0.md section 9 fallback; swap for a CC-BY GLB later and record it in PLACEHOLDERS.md.)
const COUNTS = { cervical: 7, thoracic: 12, lumbar: 5 } as const;
const TOTAL = 24;
const TOP = 2.5;
const BOTTOM = -2.0;

const regionOf = (i: number): RegionId =>
  i < COUNTS.cervical
    ? "cervical"
    : i < COUNTS.cervical + COUNTS.thoracic
      ? "thoracic"
      : "lumbar";

const yAt = (t: number) => TOP + (BOTTOM - TOP) * t;
const zAt = (t: number) => 0.32 * Math.sin(2 * Math.PI * (t * 1.1));
const slopeAt = (t: number) => {
  const e = 0.001;
  return Math.atan2(zAt(t + e) - zAt(t - e), yAt(t - e) - yAt(t + e));
};

const BONE = "#efe9df";
const SIGNAL = "#e8735a";

function Vertebra({ index, lit }: { index: number; lit: boolean }) {
  const t = index / (TOTAL - 1);
  const s = 0.55 + 0.5 * t;
  return (
    <group
      position={[0, yAt(t), zAt(t)]}
      rotation={[slopeAt(t), 0, 0]}
      scale={s}
    >
      <mesh>
        <cylinderGeometry args={[0.24, 0.26, 0.15, 20]} />
        <meshPhysicalMaterial
          color={lit ? SIGNAL : BONE}
          emissive={lit ? SIGNAL : "#000000"}
          emissiveIntensity={lit ? 0.45 : 0}
          clearcoat={0.3}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[0.08, 0.12, 0.22]} />
        <meshPhysicalMaterial
          color={lit ? SIGNAL : BONE}
          emissive={lit ? SIGNAL : "#000000"}
          emissiveIntensity={lit ? 0.45 : 0}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, 0, -0.16]}>
        <boxGeometry args={[0.7, 0.07, 0.08]} />
        <meshPhysicalMaterial
          color={lit ? SIGNAL : BONE}
          emissive={lit ? SIGNAL : "#000000"}
          emissiveIntensity={lit ? 0.45 : 0}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

function Sacrum({ lit }: { lit: boolean }) {
  const t = 1.12;
  return (
    <group position={[0, yAt(t) - 0.05, zAt(1) - 0.05]} rotation={[0.35, 0, 0]}>
      <mesh>
        <coneGeometry args={[0.38, 0.75, 4]} />
        <meshPhysicalMaterial
          color={lit ? SIGNAL : BONE}
          emissive={lit ? SIGNAL : "#000000"}
          emissiveIntensity={lit ? 0.45 : 0}
          clearcoat={0.3}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, -0.5, 0.05]} rotation={[0.2, 0, 0]}>
        <coneGeometry args={[0.1, 0.35, 8]} />
        <meshPhysicalMaterial
          color={lit ? SIGNAL : BONE}
          emissive={lit ? SIGNAL : "#000000"}
          emissiveIntensity={lit ? 0.45 : 0}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

function Cord() {
  const geometry = useMemo(() => {
    const pts = Array.from({ length: 30 }, (_, i) => {
      const t = i / 29;
      return new THREE.Vector3(0, yAt(t), zAt(t) - 0.1);
    });
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      80,
      0.045,
      10,
      false,
    );
  }, []);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#1cabb0"
        emissive="#1cabb0"
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

// Invisible capsules along the spine axis so regions are clickable even without per-vertebra meshes.
const ZONES: { id: RegionId; from: number; to: number }[] = [
  { id: "cervical", from: 0, to: COUNTS.cervical - 1 },
  {
    id: "thoracic",
    from: COUNTS.cervical,
    to: COUNTS.cervical + COUNTS.thoracic - 1,
  },
  { id: "lumbar", from: COUNTS.cervical + COUNTS.thoracic, to: TOTAL - 1 },
];

function HitZone({
  id,
  from,
  to,
  onSelect,
}: {
  id: RegionId;
  from: number;
  to: number;
  onSelect: (id: RegionId) => void;
}) {
  const t0 = from / (TOTAL - 1);
  const t1 = to / (TOTAL - 1);
  const mid = (t0 + t1) / 2;
  const length = Math.abs(yAt(t1) - yAt(t0));
  return (
    <mesh
      position={[0, yAt(mid), zAt(mid)]}
      onPointerOver={() => onSelect(id)}
      onClick={() => onSelect(id)}
    >
      <capsuleGeometry args={[0.55, length, 4, 12]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function SacralZone({ onSelect }: { onSelect: (id: RegionId) => void }) {
  return (
    <mesh
      position={[0, yAt(1.12) - 0.2, zAt(1)]}
      onPointerOver={() => onSelect("sacral")}
      onClick={() => onSelect("sacral")}
    >
      <capsuleGeometry args={[0.5, 0.6, 4, 12]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function Rig({
  selected,
  onSelect,
  autoRotate,
}: {
  selected: RegionId | null;
  onSelect: (id: RegionId) => void;
  autoRotate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.35;
      invalidate(); // keep rendering only while auto-rotating (frameloop="demand")
    }
  });
  return (
    <group ref={group}>
      {Array.from({ length: TOTAL }, (_, i) => (
        <Vertebra key={i} index={i} lit={selected === regionOf(i)} />
      ))}
      <Sacrum lit={selected === "sacral"} />
      <Cord />
      {ZONES.map((z) => (
        <HitZone key={z.id} {...z} onSelect={onSelect} />
      ))}
      <SacralZone onSelect={onSelect} />
    </group>
  );
}

export default function SpineScene({
  selected,
  onSelect,
  active,
  autoRotate,
  onInteract,
}: {
  selected: RegionId | null;
  onSelect: (id: RegionId) => void;
  active: boolean;
  autoRotate: boolean;
  onInteract: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      onPointerDown={onInteract}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, 0, -3]} intensity={30} color="#1cabb0" />
      <PresentationControls
        global
        polar={[-0.25, 0.25]}
        azimuth={[-Infinity, Infinity]}
        speed={1.4}
        snap={false}
      >
        <Rig selected={selected} onSelect={onSelect} autoRotate={autoRotate} />
      </PresentationControls>
    </Canvas>
  );
}
