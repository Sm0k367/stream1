/**
 * Comprehensive TypeScript type definitions for Smoke Stream
 */

export interface SunoTrack {
  id: string;
  title: string;
  artist?: string;
  genre?: string;
  duration?: number;
  shareUrl: string;
  streamUrl: string;
  coverArt: string;
  description?: string;
  createdAt?: string;
}

export interface AudioState {
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
}

export interface FrequencyData {
  average: number;
  peak: number;
  frequencies: Uint8Array;
  bass: number;
  mid: number;
  treble: number;
}

export interface VisualizerSettings {
  mode: 'nebula' | 'bars' | 'waveform' | 'spectrum' | 'particles';
  theme: 'purple' | 'cyan' | 'neon' | 'dark' | 'rainbow';
  intensity: number;
  particleCount: number;
  smoothing: number;
  autoRotate: boolean;
  showFrequencyBands: boolean;
}

export interface PlaylistState {
  tracks: SunoTrack[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
}

export interface PlayerControls {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
  toggleShuffle: () => void;
}

export interface AudioAnalyzerData {
  getFrequencyData: () => FrequencyData;
  getWaveformData: () => Uint8Array;
  getAverageFrequency: () => number;
  getPeakFrequency: () => number;
  getFrequencyBands: () => { bass: number; mid: number; treble: number };
}

export interface NowPlayingInfo {
  track: SunoTrack;
  progress: number;
  duration: number;
  isPlaying: boolean;
  nextTrack?: SunoTrack;
  previousTrack?: SunoTrack;
}

export interface UIState {
  showPlaylist: boolean;
  showSettings: boolean;
  showVisualizer: boolean;
  showNowPlaying: boolean;
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
}

export interface AppConfig {
  autoPlay: boolean;
  autoNext: boolean;
  visualizerEnabled: boolean;
  audioAnalysisEnabled: boolean;
  particleQuality: 'low' | 'medium' | 'high';
  animationSpeed: 'slow' | 'normal' | 'fast';
  enableSound: boolean;
  enableVibration: boolean;
}
