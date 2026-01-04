'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Search, Shuffle, RotateCcw } from 'lucide-react';
import { usePlaylistManager } from '../hooks/usePlaylistManager';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export const PlaylistManager = () => {
  const playlist = usePlaylistManager();
  const { currentTrackIndex, next } = useAudioPlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      playlist.search(query);
    } else {
      playlist.reset();
    }
  };

  const handleGenreFilter = (genre: string | null) => {
    setSelectedGenre(genre);
    playlist.filterByGenre(genre);
  };

  const genres = playlist.getGenres();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl max-w-sm max-h-[600px] flex flex-col"
    >
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Playlist</h2>
          <span className="ml-auto text-xs text-white/60">{playlist.tracks.length} tracks</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Genre Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-white/60">Genres</label>
            {selectedGenre && (
              <button
                onClick={() => handleGenreFilter(null)}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreFilter(selectedGenre === genre ? null : genre)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => playlist.shuffle()}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/10 text-white/60 hover:bg-white/20 transition-all flex items-center justify-center gap-1 border border-white/20"
          >
            <Shuffle className="w-3 h-3" />
            Shuffle
          </button>
          <button
            onClick={() => playlist.reset()}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/10 text-white/60 hover:bg-white/20 transition-all flex items-center justify-center gap-1 border border-white/20"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto space-y-1">
          <AnimatePresence>
            {playlist.tracks.map((track, index) => (
              <motion.button
                key={track.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => playlist.goToTrack(index)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                  index === currentTrackIndex
                    ? 'bg-purple-500/30 text-white border border-purple-500/50'
                    : 'text-white/70 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/40 w-4">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{track.title}</p>
                    <p className="text-xs text-white/40 truncate">{track.artist}</p>
                  </div>
                  {index === currentTrackIndex && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
