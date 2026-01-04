'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AudioState,
  VisualizerSettings,
  UIState,
  AppConfig,
} from './types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from './constants';

/**
 * Audio Player Store
 */
interface AudioStore extends AudioState {
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrackIndex: (index: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean) => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
  setIsShuffle: (shuffle: boolean) => void;
  setAudio: (audio: HTMLAudioElement | null) => void;
}

export const useAudioStore = create<AudioStore>()(
  persist(
    (set) => ({
      isPlaying: false,
      currentTrackIndex: 0,
      currentTrack: {} as any,
      audio: null,
      currentTime: 0,
      duration: 0,
      volume: DEFAULT_SETTINGS.volume,
      isMuted: false,
      repeatMode: DEFAULT_SETTINGS.repeatMode,
      isShuffle: DEFAULT_SETTINGS.shuffle,

      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setCurrentTrackIndex: (index) => set({ currentTrackIndex: index }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
      setIsMuted: (muted) => set({ isMuted: muted }),
      setRepeatMode: (mode) => set({ repeatMode: mode }),
      setIsShuffle: (shuffle) => set({ isShuffle: shuffle }),
      setAudio: (audio) => set({ audio }),
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
      partialize: (state) => ({
        volume: state.volume,
        repeatMode: state.repeatMode,
        isShuffle: state.isShuffle,
      }),
    }
  )
);

/**
 * Visualizer Settings Store
 */
interface VisualizerStore extends VisualizerSettings {
  setMode: (mode: VisualizerSettings['mode']) => void;
  setTheme: (theme: VisualizerSettings['theme']) => void;
  setIntensity: (intensity: number) => void;
  setParticleCount: (count: number) => void;
  setSmoothing: (smoothing: number) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setShowFrequencyBands: (show: boolean) => void;
}

export const useVisualizerStore = create<VisualizerStore>()(
  persist(
    (set) => ({
      mode: 'nebula',
      theme: 'purple',
      intensity: 1,
      particleCount: 2000,
      smoothing: 0.8,
      autoRotate: true,
      showFrequencyBands: true,

      setMode: (mode) => set({ mode }),
      setTheme: (theme) => set({ theme }),
      setIntensity: (intensity) => set({ intensity: Math.max(0, Math.min(2, intensity)) }),
      setParticleCount: (count) => set({ particleCount: count }),
      setSmoothing: (smoothing) => set({ smoothing: Math.max(0, Math.min(1, smoothing)) }),
      setAutoRotate: (autoRotate) => set({ autoRotate }),
      setShowFrequencyBands: (show) => set({ showFrequencyBands: show }),
    }),
    {
      name: STORAGE_KEYS.VISUALIZER_MODE,
    }
  )
);

/**
 * UI State Store
 */
interface UIStore extends UIState {
  togglePlaylist: () => void;
  toggleSettings: () => void;
  toggleVisualizer: () => void;
  toggleNowPlaying: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  closeAllPanels: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      showPlaylist: false,
      showSettings: false,
      showVisualizer: true,
      showNowPlaying: true,
      sidebarOpen: false,
      theme: 'dark',

      togglePlaylist: () => set((state) => ({ showPlaylist: !state.showPlaylist })),
      toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
      toggleVisualizer: () => set((state) => ({ showVisualizer: !state.showVisualizer })),
      toggleNowPlaying: () => set((state) => ({ showNowPlaying: !state.showNowPlaying })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
      closeAllPanels: () =>
        set({
          showPlaylist: false,
          showSettings: false,
          sidebarOpen: false,
        }),
    }),
    {
      name: STORAGE_KEYS.THEME,
    }
  )
);

/**
 * App Configuration Store
 */
interface ConfigStore extends AppConfig {
  setAutoPlay: (autoPlay: boolean) => void;
  setAutoNext: (autoNext: boolean) => void;
  setVisualizerEnabled: (enabled: boolean) => void;
  setAudioAnalysisEnabled: (enabled: boolean) => void;
  setParticleQuality: (quality: 'low' | 'medium' | 'high') => void;
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  setEnableSound: (enabled: boolean) => void;
  setEnableVibration: (enabled: boolean) => void;
  resetToDefaults: () => void;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      autoPlay: DEFAULT_SETTINGS.autoPlay,
      autoNext: DEFAULT_SETTINGS.autoNext,
      visualizerEnabled: DEFAULT_SETTINGS.visualizerEnabled,
      audioAnalysisEnabled: DEFAULT_SETTINGS.audioAnalysisEnabled,
      particleQuality: DEFAULT_SETTINGS.particleQuality,
      animationSpeed: DEFAULT_SETTINGS.animationSpeed,
      enableSound: DEFAULT_SETTINGS.enableSound,
      enableVibration: DEFAULT_SETTINGS.enableVibration,

      setAutoPlay: (autoPlay) => set({ autoPlay }),
      setAutoNext: (autoNext) => set({ autoNext }),
      setVisualizerEnabled: (enabled) => set({ visualizerEnabled: enabled }),
      setAudioAnalysisEnabled: (enabled) => set({ audioAnalysisEnabled: enabled }),
      setParticleQuality: (quality) => set({ particleQuality: quality }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      setEnableSound: (enabled) => set({ enableSound: enabled }),
      setEnableVibration: (enabled) => set({ enableVibration: enabled }),
      resetToDefaults: () =>
        set({
          autoPlay: DEFAULT_SETTINGS.autoPlay,
          autoNext: DEFAULT_SETTINGS.autoNext,
          visualizerEnabled: DEFAULT_SETTINGS.visualizerEnabled,
          audioAnalysisEnabled: DEFAULT_SETTINGS.audioAnalysisEnabled,
          particleQuality: DEFAULT_SETTINGS.particleQuality,
          animationSpeed: DEFAULT_SETTINGS.animationSpeed,
          enableSound: DEFAULT_SETTINGS.enableSound,
          enableVibration: DEFAULT_SETTINGS.enableVibration,
        }),
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
    }
  )
);
