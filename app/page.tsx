'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { NebulaScene } from '../components/NebulaScene';
import { PlayerHUD } from '../components/PlayerHUD';
import { NowPlayingCard } from '../components/NowPlayingCard';
import { VisualizerPanel } from '../components/VisualizerPanel';
import { SettingsPanel } from '../components/SettingsPanel';
import { PlaylistManager } from '../components/PlaylistManager';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export default function SunoNebulaPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { play } = useAudioPlayer();

  const handleStart = () => {
    setHasStarted(true);
    setTimeout(() => play(), 200);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!hasStarted) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          break;
        case 'KeyP':
          setShowPlaylist((prev) => !prev);
          break;
        case 'KeyS':
          setShowSettings((prev) => !prev);
          break;
        case 'KeyV':
          setShowVisualizer((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasStarted]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <NebulaScene />

      <AnimatePresence>
        {hasStarted && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 z-40"
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
                SMOKE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  STREAM
                </span>
              </h1>
              <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-cyan-500 mt-2" />
            </motion.div>

            {/* Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute top-6 right-6 z-40 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/20"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Sidebar */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  className="absolute top-0 right-0 h-full w-full max-w-md z-30 bg-black/95 backdrop-blur-xl border-l border-white/20 p-6 overflow-y-auto"
                >
                  <div className="space-y-6 mt-16">
                    {/* Quick Controls */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                        Quick Controls
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setShowPlaylist(!showPlaylist);
                            setSidebarOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            showPlaylist
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          Playlist (P)
                        </button>
                        <button
                          onClick={() => {
                            setShowSettings(!showSettings);
                            setSidebarOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            showSettings
                              ? 'bg-cyan-500 text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          Settings (S)
                        </button>
                        <button
                          onClick={() => {
                            setShowVisualizer(!showVisualizer);
                            setSidebarOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all col-span-2 ${
                            showVisualizer
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          Visualizer (V)
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                        Keyboard Shortcuts
                      </h3>
                      <div className="space-y-1 text-xs text-white/50">
                        <p><span className="text-purple-400">Space</span> - Play/Pause</p>
                        <p><span className="text-purple-400">N</span> - Next Track</p>
                        <p><span className="text-purple-400">P</span> - Previous Track</p>
                        <p><span className="text-purple-400">P</span> - Toggle Playlist</p>
                        <p><span className="text-purple-400">S</span> - Toggle Settings</p>
                        <p><span className="text-purple-400">V</span> - Toggle Visualizer</p>
                      </div>
                    </div>

                    {/* About */}
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                        About
                      </h3>
                      <p className="text-xs text-white/50">
                        Smoke Stream v2.0 - A hyper-visual, generative audio experience powered by Suno AI, Three.js, and Next.js 14.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Left - Now Playing */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-24 left-6 w-80 pointer-events-auto"
              >
                <NowPlayingCard />
              </motion.div>

              {/* Top Right - Visualizer & Settings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute top-24 right-6 space-y-4 pointer-events-auto"
              >
                <AnimatePresence>
                  {showVisualizer && <VisualizerPanel />}
                </AnimatePresence>
                <AnimatePresence>
                  {showSettings && <SettingsPanel />}
                </AnimatePresence>
              </motion.div>

              {/* Bottom Left - Playlist */}
              <AnimatePresence>
                {showPlaylist && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-32 left-6 pointer-events-auto"
                  >
                    <PlaylistManager />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Player HUD */}
            <PlayerHUD />
          </>
        )}
      </AnimatePresence>

      {/* Splash Screen */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-thin text-white tracking-[0.4em] uppercase"
              >
                NEBULA
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 text-lg tracking-widest"
              >
                A Hyper-Visual Audio Experience
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="group relative px-12 py-4 border border-white/20 rounded-full overflow-hidden transition-all hover:border-purple-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:via-purple-500/40 group-hover:to-cyan-500/20 transition-all" />
                <span className="relative z-10 text-white tracking-[0.3em] text-sm font-light uppercase">
                  Enter the Stream
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}
