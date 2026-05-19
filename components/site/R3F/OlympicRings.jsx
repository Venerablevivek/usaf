'use client';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Olympic Rings formation in 3D. Five interlocked rings using torus geometries,
 * arranged in the classic Olympic configuration (top: blue/black/red, bottom: yellow/green).
 * Slowly floats and rotates for an emblem-like presence.
 */
const RING_COLORS = ['#0085C7', '#000000', '#DF0024', '#F4C300', '#009F3D'];
// classic positions: top row = (-r*2, 0), (0,0), (r*2, 0); bottom row = (-r, -r*0.95), (r, -r*0.95)

export default function OlympicRings({ scale = 1, radius = 1.6, tube = 0.16 }) {
  const groupRef = useRef();
  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.06;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
  });

  const positions = [
    [-radius * 2.05, 0, 0],
    [0, 0, 0],
    [ radius * 2.05, 0, 0],
    [-radius * 1.02, -radius * 0.95, 0.02],
    [ radius * 1.02, -radius * 0.95, 0.02],
  ];

  return (
    <group ref={groupRef} scale={scale}>
      {RING_COLORS.map((c, i) => (
        <mesh key={i} position={positions[i]} rotation={[0, 0, 0]}>
          <torusGeometry args={[radius, tube, 28, 96]} />
          <meshStandardMaterial
            color={c}
            emissive={c}
            emissiveIntensity={0.45}
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>
      ))}
      {/* soft halo behind rings */}
      <mesh position={[0, -radius * 0.45, -1.5]}>
        <planeGeometry args={[radius * 8, radius * 5]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
