'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import VolumetricClouds from './VolumetricClouds';
import FloatingDust from './FloatingDust';
import OlympicRings from './OlympicRings';

/**
 * Per-scene cinematic 3D atmosphere.
 * mode: 'clouds' | 'bloom' | 'rings'
 * Designed to feel invisible and emotional, not flashy.
 */
export default function SceneCanvas({ mode = 'clouds' }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 14], fov: 50, near: 0.1, far: 200 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.fog = new THREE.FogExp2(0x05060A, 0.018);
      }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 8, 6]} intensity={0.6} color={'#ffffff'} />
      <directionalLight position={[-8, -4, 2]} intensity={0.18} color={'#0085C7'} />

      <Suspense fallback={null}>
        {mode === 'clouds' && (
          <>
            <VolumetricClouds tint="#ffffff" density={0.9} />
            <FloatingDust count={500} radius={50} size={0.45} color="#ffffff" opacity={0.85} speed={1} />
          </>
        )}
        {mode === 'bloom' && (
          <>
            {/* soft cinematic bloom orb + dust */}
            <mesh position={[0, 0, -6]}>
              <sphereGeometry args={[4.5, 64, 64]} />
              <meshBasicMaterial color="#DF0024" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0, -5]}>
              <sphereGeometry args={[2.8, 64, 64]} />
              <meshBasicMaterial color="#F4C300" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0, -4]}>
              <sphereGeometry args={[1.4, 64, 64]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <FloatingDust count={700} radius={55} size={0.5} color="#fff7d6" opacity={0.95} speed={1.1} />
          </>
        )}
        {mode === 'rings' && (
          <>
            <OlympicRings scale={1} />
            <FloatingDust count={550} radius={55} size={0.45} color="#ffffff" opacity={0.9} speed={0.9} />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}
