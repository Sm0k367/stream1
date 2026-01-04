'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
} from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export const PlayerHUD = () => {
  const {
    isPlaying,
    currentTrack,
    play,
    pause,
    next,
    previous,
    initAudio,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    repeatMode,
    setRepeatMode,
    isShuffle,
    toggleShuffle,
    currentTime,
    duration,
    seek,
  } = useAudioPlayer();

  useEffect(() => {
    const handleInit = () => {
      initAudio();
      window.removeEventListener('click', handleInit);
    };
    window.addEventListener('click', handleInit);
    return () => window.removeEventListener('click', handleInit);
  }, [initAudio]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const getRepeatIcon = () => {
    if (repeatMode === 'one') return '1';
    if (repeatMode === 'all') return '∞';
    return '';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/80 to-transparent pt-8 pb-6 px-6">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto space-y-4"
      >
        {/* Progress Bar */}
        <div className="space-y-2">
          <div
            className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seek(percent * duration);
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:shadow-lg group-hover:shadow-purple-500/50"
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Player */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-4">
            {/* Album Art */}
            <motion.img
              src={currentTrack.coverArt}
              alt="Album"
              className="h-16 w-16 rounded-xl shadow-lg border border-white/10 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=64&h=64&fit=crop';
              }}
              whileHover={{ scale: 1.05 }}
            />

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">{currentTrack.title}</h3>
              <p className="text-white/50 text-sm truncate">
                {currentTrack.artist || 'DJ Smoke Stream'} • {currentTrack.genre || 'Electronic'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Previous */}
              <motion.button
                onClick={previous}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <SkipBack size={20} />
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                onClick={isPlaying ? pause : play}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </motion.button>

              {/* Next */}
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <SkipForward size={20} />
              </motion.button>

              {/* Shuffle */}
              <motion.button
                onClick={toggleShuffle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all ${
                  isShuffle
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <Shuffle size={18} />
              </motion.button>

              {/* Repeat */}
              <motion.button
                onClick={() => {
                  const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
                  const currentIndex = modes.indexOf(repeatMode);
                  setRepeatMode(modes[(currentIndex + 1) % modes.length]);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all relative ${
                  repeatMode !== 'off'
                    ? 'bg-cyan-500/30 text-cyan-300'
                    : 'hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <Repeat size={18} />
                {repeatMode !== 'off' && (
                  <span className="absolute -top-1 -right-1 text-xs font-bold bg-cyan-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {getRepeatIcon()}
                  </span>
                )}
              </motion.button>

              {/* Volume Control */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
                <motion.button
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </motion.button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-xs text-white/50 w-8 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
