import { create } from 'zustand';

interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTrackId: string | null;
  frequencyData: Uint8Array;
  // Actions
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTrack: (id: string) => void;
  setFrequencyData: (data: Uint8Array) => void;
}

interface VisualSettings {
  theme: 'purple' | 'cyan' | 'neon' | 'dark' | 'rainbow';
  mode: 'nebula' | 'bars' | 'waveform' | 'spectrum' | 'particles';
  particleCount: number;
  setTheme: (theme: VisualSettings['theme']) => void;
  setMode: (mode: VisualSettings['mode']) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  currentTrackId: null,
  frequencyData: new Uint8Array(0),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentTrack: (id) => set({ currentTrackId: id }),
  setFrequencyData: (data) => set({ frequencyData: data }),
}));

export const useVisualStore = create<VisualSettings>((set) => ({
  theme: 'purple',
  mode: 'nebula',
  particleCount: 2000,
  
  setTheme: (theme) => set({ theme }),
  setMode: (mode) => set({ mode }),
}));
