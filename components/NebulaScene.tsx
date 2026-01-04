'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAudioStore, useVisualStore } from '@/lib/store';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const frequencyData = useAudioStore((state) => state.frequencyData);
  const { theme } = useVisualStore();

  // Create 2,000 random positions for the particles
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  // Theme colors mapping
  const colors = {
    purple: '#a855f7',
    cyan: '#06b6d4',
    neon: '#adff2f',
    dark: '#444444',
    rainbow: '#ffffff'
  };

  useFrame((state) => {
    if (!ref.current) return;

    // Get average frequency (volume) to drive overall movement
    const avg = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;
    const intensity = avg / 255;

    // Rotate the whole nebula based on the beat
    ref.current.rotation.x += 0.001 + (intensity * 0.05);
    ref.current.rotation.y += 0.002;

    // Make particles "pulse" with the bass
    const scale = 1 + (intensity * 1.5);
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={colors[theme as keyof typeof colors]}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function NebulaScene() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ParticleField />
        </Float>
      </Canvas>
    </div>
  );
}
