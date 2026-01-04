'use client';

import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useAudioStore } from '@/lib/store';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import { PLAYLIST, getTrackById } from '@/lib/playlist';

export default function PlayerHUD() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    isPlaying, setIsPlaying, 
    volume, setVolume, 
    isMuted, toggleMute, 
    currentTrackId, setCurrentTrack 
  } = useAudioStore();

  // Initialize the Audio Analyzer hook with our audio element
  useAudioAnalyzer(audioRef.current);

  // Sync Audio Element state with Global State
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackId, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const currentTrack = getTrackById(currentTrackId || PLAYLIST[0].id);

  const handleNext = () => {
    const index = PLAYLIST.findIndex(t => t.id === currentTrack.id);
    const nextTrack = PLAYLIST[(index + 1) % PLAYLIST.length];
    setCurrentTrack(nextTrack.id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 z-10 flex justify-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl w-full max-w-2xl flex items-center justify-between gap-4 shadow-2xl">
        
        {/* Hidden Audio Tag */}
        <audio 
          ref={audioRef} 
          src={currentTrack.url} 
          crossOrigin="anonymous" 
          onEnded={handleNext}
        />

        {/* Track Info */}
        <div className="flex flex-col min-w-[150px]">
          <span className="text-white font-bold truncate">{currentTrack.title}</span>
          <span className="text-white/60 text-xs truncate">{currentTrack.artist}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button className="text-white/80 hover:text-white transition">
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black p-3 rounded-full hover:scale-105 transition"
          >
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
          </button>

          <button onClick={handleNext} className="text-white/80 hover:text-white transition">
            <SkipForward size={24} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 group">
          <button onClick={toggleMute} className="text-white/80 hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input 
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-purple-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
