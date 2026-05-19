'use client';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Premium floating dust / volumetric particles.
 * Uses additive blending + custom soft sprite texture, instanced via Points.
 */
function makeDotTexture() {
  if (typeof document === 'undefined') return null;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6,  'rgba(255,255,255,0.12)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,size,size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

export default function FloatingDust({
  count = 600,
  radius = 60,
  size = 0.55,
  color = '#ffffff',
  speed = 1,
  opacity = 0.85,
}) {
  const ref = useRef();
  const texture = useMemo(() => makeDotTexture(), []);

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.cbrt(Math.random()) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i*3+0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = (Math.random() - 0.5) * radius * 0.8;
      positions[i*3+2] = r * Math.sin(phi) * Math.sin(theta) - radius * 0.5;
      speeds[i] = 0.08 + Math.random() * 0.18;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, [count, radius]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    const t = performance.now() * 0.001;
    for (let i = 0; i < count; i++) {
      pos[i*3+1] += speeds[i] * dt * speed;
      pos[i*3+0] += Math.sin(t * 0.4 + offsets[i]) * dt * 0.06 * speed;
      if (pos[i*3+1] > radius * 0.5) pos[i*3+1] = -radius * 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    // soft rotation for parallax feel
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.08;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={texture}
        color={color}
      />
    </points>
  );
}
