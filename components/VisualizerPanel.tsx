'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Zap } from 'lucide-react';
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer';
import { useVisualizerSettings } from '../hooks/useVisualizerSettings';

export const VisualizerPanel = () => {
  const { getFrequencyData, getFrequencyBands } = useAudioAnalyzer();
  const { settings, getThemeColors } = useVisualizerSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const themeColors = getThemeColors();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { frequencies, average, peak } = getFrequencyData();
      const { bass, mid, treble } = getFrequencyBands();

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw frequency bars
      const barWidth = canvas.width / frequencies.length;
      const centerY = canvas.height / 2;

      for (let i = 0; i < frequencies.length; i++) {
        const value = frequencies[i] / 255;
        const barHeight = value * canvas.height * 0.4;

        // Gradient color based on frequency
        const hue = (i / frequencies.length) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        // Draw bars
        ctx.fillRect(i * barWidth, centerY - barHeight / 2, barWidth - 1, barHeight);
      }

      // Draw frequency band indicators
      const bandSize = 40;
      const bandY = canvas.height - 60;

      // Bass
      ctx.fillStyle = themeColors.primary;
      ctx.fillRect(20, bandY - (bass / 255) * 40, bandSize, (bass / 255) * 40);

      // Mid
      ctx.fillStyle = themeColors.secondary;
      ctx.fillRect(70, bandY - (mid / 255) * 40, bandSize, (mid / 255) * 40);

      // Treble
      ctx.fillStyle = themeColors.accent;
      ctx.fillRect(120, bandY - (treble / 255) * 40, bandSize, (treble / 255) * 40);

      // Draw peak indicator
      ctx.strokeStyle = themeColors.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 40, 40, (peak / 255) * 30, 0, Math.PI * 2);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [getFrequencyData, getFrequencyBands, themeColors]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl overflow-hidden"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Audio Visualizer</h3>
          <Zap className="w-4 h-4 text-cyan-400 ml-auto" />
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={300}
          height={150}
          className="w-full h-auto rounded-lg bg-black/30 border border-white/10"
        />

        {/* Mode Indicator */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Mode: {settings.mode}</span>
          <span>Theme: {settings.theme}</span>
        </div>
      </div>
    </motion.div>
  );
};
