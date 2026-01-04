'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer';
import { useVisualizerSettings } from '../hooks/useVisualizerSettings';

function SmokeParticles() {
  const ref = useRef<THREE.Points>(null!);
  const { isPlaying } = useAudioPlayer();
  const { getFrequencyData } = useAudioAnalyzer();
  const { settings, getThemeColors } = useVisualizerSettings();

  const themeColors = getThemeColors();
  const particleCount = settings.particleCount;

  const sphere = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const stride = i * 3;
      arr[stride] = (Math.random() - 0.5) * 15;
      arr[stride + 1] = (Math.random() - 0.5) * 15;
      arr[stride + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const { average } = getFrequencyData();
    const audioInfluence = (average / 255) * settings.intensity;
    const baseSpeed = isPlaying ? 0.15 : 0.02;
    const speed = baseSpeed + audioInfluence * 0.1;

    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * (speed / 1.5);

    // Scale based on audio
    const scale = 1 + audioInfluence * 0.3;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={themeColors.primary}
          size={0.07}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function AudioReactiveBackground() {
  const { getFrequencyBands } = useAudioAnalyzer();
  const { settings, getThemeColors } = useVisualizerSettings();
  const themeColors = getThemeColors();

  return (
    <group>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial
          color={themeColors.dark}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export const NebulaScene = () => {
  const { settings } = useVisualizerSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <fog attach="fog" args={['#000', 5, 20]} />
        <AudioReactiveBackground />
        <SmokeParticles />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
      </Canvas>

      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
};
