'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Clock, User } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export const NowPlayingCard = () => {
  const { currentTrack, currentTime, duration, isPlaying } = useAudioPlayer();

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 animate-pulse" />
      </div>

      <div className="relative z-10 space-y-4">
        {/* Album Art */}
        <motion.div
          animate={{ scale: isPlaying ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/20"
        >
          <img
            src={currentTrack.coverArt}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop';
            }}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Music className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Track Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white truncate">{currentTrack.title}</h3>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <User className="w-4 h-4" />
            <span className="truncate">{currentTrack.artist || 'DJ Smoke Stream'}</span>
          </div>
          {currentTrack.genre && (
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">
                {currentTrack.genre}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
          <motion.div
            animate={{ opacity: isPlaying ? 1 : 0.5 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/20"
          >
            <motion.div
              animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <span className="text-xs text-white/70">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </span>
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-l from-cyan-500/50 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};
