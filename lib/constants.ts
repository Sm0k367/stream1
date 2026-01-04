/**
 * Global constants and configuration for Smoke Stream
 */

export const APP_NAME = 'Smoke Stream';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'A hyper-visual, generative audio experience powered by Suno AI, Three.js, and Next.js 14';

// Audio Configuration
export const AUDIO_CONFIG = {
  FFT_SIZE: 512,
  SMOOTHING_TIME_CONSTANT: 0.8,
  MIN_DECIBELS: -100,
  MAX_DECIBELS: -10,
  DEFAULT_VOLUME: 0.7,
  FADE_DURATION: 300, // ms
} as const;

// Visualizer Configuration
export const VISUALIZER_CONFIG = {
  PARTICLE_COUNT_LOW: 1000,
  PARTICLE_COUNT_MEDIUM: 2000,
  PARTICLE_COUNT_HIGH: 5000,
  DEFAULT_PARTICLE_COUNT: 2000,
  PARTICLE_SIZE: 0.07,
  PARTICLE_SPEED_IDLE: 0.02,
  PARTICLE_SPEED_PLAYING: 0.15,
  ROTATION_SPEED_MULTIPLIER: 1.5,
  FOG_NEAR: 5,
  FOG_FAR: 20,
  CAMERA_Z: 5,
  CAMERA_FOV: 75,
} as const;

// Theme Colors
export const THEME_COLORS = {
  purple: {
    primary: '#a855f7',
    secondary: '#d946ef',
    accent: '#ec4899',
    dark: '#1e1b4b',
  },
  cyan: {
    primary: '#06b6d4',
    secondary: '#0891b2',
    accent: '#00d9ff',
    dark: '#0c4a6e',
  },
  neon: {
    primary: '#ff006e',
    secondary: '#ffbe0b',
    accent: '#00f5ff',
    dark: '#0a0e27',
  },
  dark: {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    accent: '#9ca3af',
    dark: '#000000',
  },
  rainbow: {
    primary: '#ff0000',
    secondary: '#00ff00',
    accent: '#0000ff',
    dark: '#000000',
  },
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
  DESKTOP: 1280,
  WIDE: 1920,
} as const;

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 320,
  PLAYER_HEIGHT: 100,
  HEADER_HEIGHT: 80,
  BORDER_RADIUS: 16,
  BLUR_AMOUNT: 'xl',
} as const;

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: ' ',
  NEXT: 'n',
  PREVIOUS: 'p',
  VOLUME_UP: 'ArrowUp',
  VOLUME_DOWN: 'ArrowDown',
  SEEK_FORWARD: 'ArrowRight',
  SEEK_BACKWARD: 'ArrowLeft',
  MUTE: 'm',
  FULLSCREEN: 'f',
  SETTINGS: 's',
  PLAYLIST: 'l',
} as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  autoPlay: true,
  autoNext: true,
  visualizerEnabled: true,
  audioAnalysisEnabled: true,
  particleQuality: 'high' as const,
  animationSpeed: 'normal' as const,
  enableSound: true,
  enableVibration: false,
  volume: 0.7,
  repeatMode: 'all' as const,
  shuffle: false,
} as const;

// Visualization Modes
export const VISUALIZATION_MODES = [
  'nebula',
  'bars',
  'waveform',
  'spectrum',
  'particles',
] as const;

// Themes
export const THEMES = [
  'purple',
  'cyan',
  'neon',
  'dark',
  'rainbow',
] as const;

// Repeat Modes
export const REPEAT_MODES = ['off', 'one', 'all'] as const;

// Error Messages
export const ERROR_MESSAGES = {
  AUDIO_CONTEXT_FAILED: 'Failed to initialize audio context',
  AUDIO_LOAD_FAILED: 'Failed to load audio file',
  PLAYLIST_EMPTY: 'Playlist is empty',
  INVALID_TRACK: 'Invalid track data',
  NETWORK_ERROR: 'Network error occurred',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  TRACK_LOADED: 'Track loaded successfully',
  SETTINGS_SAVED: 'Settings saved',
  PLAYLIST_UPDATED: 'Playlist updated',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  SUNO_CDN: 'https://cdn1.suno.ai',
  SUNO_SHARE: 'https://suno.com/s',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  SETTINGS: 'smoke_stream_settings',
  PLAYLIST: 'smoke_stream_playlist',
  CURRENT_TRACK: 'smoke_stream_current_track',
  VOLUME: 'smoke_stream_volume',
  THEME: 'smoke_stream_theme',
  VISUALIZER_MODE: 'smoke_stream_visualizer_mode',
} as const;

// Performance Optimization
export const PERFORMANCE_CONFIG = {
  ENABLE_LAZY_LOADING: true,
  ENABLE_CODE_SPLITTING: true,
  ENABLE_IMAGE_OPTIMIZATION: true,
  PARTICLE_CULLING_ENABLED: true,
  MAX_FRAME_RATE: 60,
} as const;
