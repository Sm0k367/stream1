'use client';

import { create } from 'zustand';
import { SUNO_PLAYLIST, SunoTrack, getNextTrackIndex, getPreviousTrackIndex } from '../lib/playlist';

interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SunoTrack;
  audio: HTMLAudioElement | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: 'off' | 'one' | 'all';
  isShuffle: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
  toggleShuffle: () => void;
  initAudio: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

export const useAudioPlayer = create<AudioState>((set, get) => ({
  isPlaying: false,
  currentTrackIndex: 0,
  currentTrack: SUNO_PLAYLIST[0],
  audio: null,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
  repeatMode: 'all',
  isShuffle: false,

  initAudio: () => {
    if (get().audio) return;
    const audio = new Audio(SUNO_PLAYLIST[0].streamUrl);
    audio.crossOrigin = 'anonymous';
    audio.volume = get().volume;

    // Auto-play next track logic
    audio.onended = () => {
      const nextIndex = getNextTrackIndex(
        get().currentTrackIndex,
        SUNO_PLAYLIST.length,
        get().repeatMode
      );
      if (nextIndex === -1) {
        get().pause();
      } else {
        get().next();
      }
    };

    // Update current time
    audio.ontimeupdate = () => {
      set({ currentTime: audio.currentTime });
    };

    // Update duration
    audio.onloadedmetadata = () => {
      set({ duration: audio.duration });
    };

    set({ audio });
  },

  play: () => {
    const { audio, initAudio } = get();
    if (!audio) {
      initAudio();
      setTimeout(() => get().audio?.play(), 100);
    } else {
      audio.play().catch((err) => console.error('Play error:', err));
    }
    set({ isPlaying: true });
  },

  pause: () => {
    get().audio?.pause();
    set({ isPlaying: false });
  },

  next: () => {
    const nextIndex = (get().currentTrackIndex + 1) % SUNO_PLAYLIST.length;
    const { audio } = get();
    if (audio) {
      audio.src = SUNO_PLAYLIST[nextIndex].streamUrl;
      if (get().isPlaying) audio.play().catch((err) => console.error('Play error:', err));
    }
    set({
      currentTrackIndex: nextIndex,
      currentTrack: SUNO_PLAYLIST[nextIndex],
      currentTime: 0,
    });
  },

  previous: () => {
    const prevIndex = getPreviousTrackIndex(get().currentTrackIndex, SUNO_PLAYLIST.length);
    const { audio } = get();
    if (audio) {
      audio.src = SUNO_PLAYLIST[prevIndex].streamUrl;
      if (get().isPlaying) audio.play().catch((err) => console.error('Play error:', err));
    }
    set({
      currentTrackIndex: prevIndex,
      currentTrack: SUNO_PLAYLIST[prevIndex],
      currentTime: 0,
    });
  },

  seek: (time: number) => {
    const { audio } = get();
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(time, audio.duration));
      set({ currentTime: audio.currentTime });
    }
  },

  setVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    const { audio } = get();
    if (audio) {
      audio.volume = clampedVolume;
    }
    set({ volume: clampedVolume });
  },

  toggleMute: () => {
    const { audio, isMuted, volume } = get();
    if (audio) {
      audio.volume = isMuted ? volume : 0;
    }
    set({ isMuted: !isMuted });
  },

  setRepeatMode: (mode: 'off' | 'one' | 'all') => {
    set({ repeatMode: mode });
  },

  toggleShuffle: () => {
    set((state) => ({ isShuffle: !state.isShuffle }));
  },

  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },

  setDuration: (duration: number) => {
    set({ duration });
  },
}));
