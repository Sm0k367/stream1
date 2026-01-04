'use client';

import React, { useState, useEffect } from 'react';
import NebulaScene from '@/components/NebulaScene';
import PlayerHUD from '@/components/PlayerHUD';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Hydration fix: Ensure Three.js only loads on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white font-mono animate-pulse">LOADING STREAM...</div>
      </div>
    );
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Visualizer Layer (Background) */}
      <NebulaScene />

      {/* UI Overlay Layer (Foreground) */}
      <div className="relative z-10 pointer-events-none">
        <div className="p-8">
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            SMOKE STREAM <span className="text-purple-500">v2.0</span>
          </h1>
          <p className="text-white/40 text-sm font-mono mt-2">
            GENERATIVE AUDIO EXPERIENCE // POWERED BY SUNO AI
          </p>
        </div>
      </div>

      {/* Interactive Controls */}
      <PlayerHUD />
      
      {/* Decorative Gradient Overlay for depth */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </main>
  );
}
