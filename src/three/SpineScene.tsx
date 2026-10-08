"use client";

import { PresentationControls } from "@react-three/drei";
import { Canvas, invalidate, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RegionId } from "@/content/regions";
import {
  STEP,
  TOTAL,
  bodyH,
  bodyW,
  levelLabel,
  levelName,
  regionOf,
  tiltAt,
  yAt,
  zAt,
} from "@/lib/spine";

// Procedural spine: 24 vertebrae (body, disc, canal ring, spinous and transverse processes), sacrum, coccyx,
// and a spinal cord that ends near L1 with the nerve roots running on below it. (promptP0.md section 9 fallback.)
const SIGNAL = "#e8735a";

const unitCyl = new THREE.CylinderGeometry(1, 1, 1, 28);
const unitBox = new THREE.BoxGeometry(1, 1, 1);
const ring = new THREE.TorusGeometry(1, 0.2, 8, 24);

function useMats(lit: boolean) {
  return useMemo(
    () => ({
      bone: new THREE.MeshPhysicalMaterial({
        color: lit ? SIGNAL : "#efe9df",
        emissive: lit ? SIGNAL : "#000000",
        emissiveIntensity: lit ? 0.4 : 0,
        clearcoat: 0.25,
        roughness: 0.55,
      }),
      disc: new THREE.MeshPhysicalMaterial({
        color: lit ? "#f2a291" : "#8fc4cb",
        roughness: 0.35,
      }),
    }),
    [lit],
  );
}

type Hover = (label: string | null) => void;

// Where the vertebral canal sits behind the body, in local z.
const canalZ = (i: number) => -(bodyW(i) * 0.8 + bodyW(i) * 0.5);

function hit(
  id: RegionId,
  label: string,
  onSelect: (id: RegionId) => void,
  onHover: Hover,
) {
  return {
    onPointerOver: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      onHover(label);
      onSelect(id);
    },
    onPointerOut: () => {
      document.body.style.cursor = "";
      onHover(null);
    },
    onClick: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onSelect(id);
    },
  };
}

function Vertebra({
  index,
  lit,
  onSelect,
  onHover,
}: {
  index: number;
  lit: boolean;
  onSelect: (id: RegionId) => void;
  onHover: Hover;
}) {
  const { bone, disc } = useMats(lit);
  const w = bodyW(index);
  const h = bodyH(index);
  const gap = STEP - h;
  const r = regionOf(index);
  const cz = canalZ(index);
  const rr = w * 0.5; // canal ring radius
  const spLen = r === "cervical" ? 0.1 : r === "thoracic" ? 0.24 : 0.17;
  const spTilt = r === "thoracic" ? -0.65 : r === "cervical" ? -0.15 : 0;
  const tpLen = r === "cervical" ? 0.09 : r === "thoracic" ? 0.15 : 0.19;
  // Spinous process starts at the back of the ring and points back (and down in the upper back).
  const spZ = cz - rr - (spLen / 2) * Math.cos(spTilt);
  const spY = (spLen / 2) * Math.sin(spTilt);
  return (
    <group
      position={[0, yAt(index), zAt(index)]}
      rotation={[tiltAt(index), 0, 0]}
      {...hit(
        r,
        `${levelLabel(index)} · ${levelName(index)}`,
        onSelect,
        onHover,
      )}
    >
      <mesh geometry={unitCyl} material={bone} scale={[w, h, w * 0.8]} />
      <mesh
        geometry={unitCyl}
        material={disc}
        position={[0, -(h / 2 + gap / 2), 0]}
        scale={[w * 1.03, gap, w * 0.83]}
      />
      <mesh
        geometry={ring}
        material={bone}
        position={[0, 0, cz]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[rr, rr, h * 0.9]}
      />
      <mesh
        geometry={unitBox}
        material={bone}
        position={[0, spY, spZ]}
        rotation={[spTilt, 0, 0]}
        scale={[0.04, 0.05, spLen]}
      />
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          geometry={unitBox}
          material={bone}
          position={[s * (rr + tpLen / 2), 0, cz + 0.02]}
          scale={[tpLen, 0.035, 0.05]}
        />
      ))}
    </group>
  );
}

function Sacrum({
  lit,
  onSelect,
  onHover,
}: {
  lit: boolean;
  onSelect: (id: RegionId) => void;
  onHover: Hover;
}) {
  const { bone } = useMats(lit);
  const x = 24.9;
  const tail = [25.9, 26.7, 27.3];
  return (
    <group {...hit("sacral", "Sacrum and tailbone", onSelect, onHover)}>
      <mesh
        material={bone}
        position={[0, yAt(x), zAt(x)]}
        rotation={[tiltAt(x), Math.PI / 4, 0]}
        scale={[1, 1, 0.5]}
      >
        <cylinderGeometry args={[0.36, 0.1, 0.78, 4]} />
      </mesh>
      {tail.map((t, k) => (
        <mesh
          key={t}
          geometry={unitCyl}
          material={bone}
          position={[0, yAt(t), zAt(t)]}
          rotation={[tiltAt(t), 0, 0]}
          scale={[0.07 - k * 0.015, 0.16, 0.06 - k * 0.012]}
        />
      ))}
    </group>
  );
}

// Position in the canal at spine index x, following the local tilt.
const canalPoint = (x: number, lateral = 0) => {
  const i = Math.min(Math.max(Math.round(x), 0), TOTAL - 1);
  const off = canalZ(i);
  const a = tiltAt(x);
  return new THREE.Vector3(
    lateral,
    yAt(x) + off * Math.sin(a),
    zAt(x) + off * Math.cos(a),
  );
};

function Cord() {
  const { cord, roots } = useMemo(() => {
    const tube = (from: number, to: number, lat: number, rad: number) => {
      const n = Math.ceil((to - from) * 2) + 1;
      const pts = Array.from({ length: n }, (_, k) =>
        canalPoint(from + ((to - from) * k) / (n - 1), lat),
      );
      return new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(pts),
        n * 4,
        rad,
        8,
        false,
      );
    };
    // The cord ends near L1/L2 (index 19); below it the nerve roots run on as the cauda equina.
    return {
      cord: tube(-0.5, 19.6, 0, 0.04),
      roots: [-0.05, -0.03, -0.01, 0.01, 0.03, 0.05].map((l) =>
        tube(19.6, 24.3, l, 0.008),
      ),
    };
  }, []);
  return (
    <group>
      <mesh geometry={cord}>
        <meshStandardMaterial
          color="#1cabb0"
          emissive="#1cabb0"
          emissiveIntensity={0.6}
        />
      </mesh>
      {roots.map((g, k) => (
        <mesh key={k} geometry={g}>
          <meshStandardMaterial
            color="#7fd3d6"
            emissive="#1cabb0"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({
  selected,
  onSelect,
  onHover,
  autoRotate,
}: {
  selected: RegionId | null;
  onSelect: (id: RegionId) => void;
  onHover: Hover;
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
    <group ref={group} position={[0, -0.1, 0]} rotation={[0, 1.1, 0]}>
      {Array.from({ length: TOTAL }, (_, i) => (
        <Vertebra
          key={i}
          index={i}
          lit={selected === regionOf(i)}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      <Sacrum
        lit={selected === "sacral"}
        onSelect={onSelect}
        onHover={onHover}
      />
      <Cord />
    </group>
  );
}

export default function SpineScene({
  selected,
  onSelect,
  onHover,
  active,
  autoRotate,
  onInteract,
}: {
  selected: RegionId | null;
  onSelect: (id: RegionId) => void;
  onHover: Hover;
  active: boolean;
  autoRotate: boolean;
  onInteract: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 35 }}
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
        <Rig
          selected={selected}
          onSelect={onSelect}
          onHover={onHover}
          autoRotate={autoRotate}
        />
      </PresentationControls>
    </Canvas>
  );
}
