'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCcw } from 'lucide-react';
import { useVisualizerSettings } from '../hooks/useVisualizerSettings';

export const SettingsPanel = () => {
  const {
    settings,
    setMode,
    setTheme,
    setIntensity,
    setParticleCount,
    setSmoothing,
    toggleAutoRotate,
    toggleFrequencyBands,
    getAvailableModes,
    getAvailableThemes,
    resetToDefaults,
  } = useVisualizerSettings();

  const modes = getAvailableModes();
  const themes = getAvailableThemes();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl max-w-sm"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Visualizer Settings</h2>
        </div>

        {/* Visualization Mode */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/80">Visualization Mode</label>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setMode(mode as any)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  settings.mode === mode
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/80">Color Theme</label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setTheme(theme as any)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  settings.theme === theme
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-white/80">Intensity</label>
            <span className="text-xs text-white/60">{settings.intensity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Particle Count */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-white/80">Particles</label>
            <span className="text-xs text-white/60">{settings.particleCount}</span>
          </div>
          <input
            type="range"
            min="500"
            max="5000"
            step="500"
            value={settings.particleCount}
            onChange={(e) => setParticleCount(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Smoothing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-white/80">Smoothing</label>
            <span className="text-xs text-white/60">{(settings.smoothing * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.smoothing}
            onChange={(e) => setSmoothing(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <button
            onClick={toggleAutoRotate}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              settings.autoRotate
                ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50'
                : 'bg-white/10 text-white/60 border border-white/20'
            }`}
          >
            {settings.autoRotate ? '✓' : '○'} Auto Rotate
          </button>
          <button
            onClick={toggleFrequencyBands}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              settings.showFrequencyBands
                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-500/50'
                : 'bg-white/10 text-white/60 border border-white/20'
            }`}
          >
            {settings.showFrequencyBands ? '✓' : '○'} Frequency Bands
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetToDefaults}
          className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white/60 hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>
    </motion.div>
  );
};
