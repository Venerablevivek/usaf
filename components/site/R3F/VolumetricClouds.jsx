'use client';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';

/**
 * Subtle volumetric cloud layer. Uses drei's Cloud (sprite-based volumetric).
 * Cinematic, soft, low-density.
 */
export default function VolumetricClouds({ tint = '#ffffff', density = 1, depth = 25 }) {
  const groupRef = useRef();
  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.position.x -= dt * 0.15;
    if (groupRef.current.position.x < -depth) groupRef.current.position.x = depth;
  });

  return (
    <group ref={groupRef}>
      <Clouds material={THREE.MeshLambertMaterial} limit={300}>
        <Cloud seed={1}  segments={28} bounds={[18, 4, 6]}  volume={6}  color={tint} fade={50} opacity={0.55 * density} position={[-8, -2, -8]} />
        <Cloud seed={2}  segments={26} bounds={[20, 3, 6]}  volume={6}  color={tint} fade={50} opacity={0.4  * density} position={[10,  1, -14]} />
        <Cloud seed={3}  segments={22} bounds={[14, 2, 5]}  volume={5}  color={tint} fade={50} opacity={0.35 * density} position={[-12, 4, -20]} />
        <Cloud seed={4}  segments={20} bounds={[16, 3, 5]}  volume={5}  color={tint} fade={50} opacity={0.5  * density} position={[6,  -4, -12]} />
        <Cloud seed={5}  segments={18} bounds={[12, 2, 4]}  volume={4}  color={tint} fade={50} opacity={0.3  * density} position={[-2,  6, -24]} />
      </Clouds>
    </group>
  );
}
