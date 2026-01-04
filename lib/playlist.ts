import { SunoTrack } from './types';

const TRACK_IDS: string[] = [
  "budKYGOsXRPSzUXI", "WQkFJDnUp9mMumqu", "LggT2EZJVY8pCTrV",
  "KAToclBpU1nJQv3x", "xUaUScrhSC98gAix", "vEOfE03Y6v5BN12V",
  "ceeBe0NLZ4ieuvOf", "I5qCYuPzkuBPaHFO", "xvqhktQCAUn34Iui",
  "9t3ThPcqmYG31rkz", "k1AwT3zoHMMueeGs", "SLHW8A9URwSdnBut",
  "Ib7odMSeO9aPMpQW", "qKPgRU7LyU5jvP71", "AniMYS2hpJ3XsR8P"
];

const TRACK_METADATA: Record<string, Partial<SunoTrack>> = {
  "budKYGOsXRPSzUXI": { title: "Neon Dreams", genre: "Electronic", artist: "DJ Smoke Stream" },
  "WQkFJDnUp9mMumqu": { title: "Cosmic Waves", genre: "Ambient", artist: "DJ Smoke Stream" },
  "LggT2EZJVY8pCTrV": { title: "Digital Pulse", genre: "Synthwave", artist: "DJ Smoke Stream" },
  "KAToclBpU1nJQv3x": { title: "Nebula Drift", genre: "Chillwave", artist: "DJ Smoke Stream" },
  "xUaUScrhSC98gAix": { title: "Quantum Leap", genre: "Techno", artist: "DJ Smoke Stream" },
  "vEOfE03Y6v5BN12V": { title: "Stellar Motion", genre: "House", artist: "DJ Smoke Stream" },
  "ceeBe0NLZ4ieuvOf": { title: "Void Echo", genre: "Ambient", artist: "DJ Smoke Stream" },
  "I5qCYuPzkuBPaHFO": { title: "Sonic Horizon", genre: "Electronic", artist: "DJ Smoke Stream" },
  "xvqhktQCAUn34Iui": { title: "Luminous Path", genre: "Synthwave", artist: "DJ Smoke Stream" },
  "9t3ThPcqmYG31rkz": { title: "Ethereal Waves", genre: "Ambient", artist: "DJ Smoke Stream" },
  "k1AwT3zoHMMueeGs": { title: "Cyber Pulse", genre: "Techno", artist: "DJ Smoke Stream" },
  "SLHW8A9URwSdnBut": { title: "Astral Journey", genre: "Chillwave", artist: "DJ Smoke Stream" },
  "Ib7odMSeO9aPMpQW": { title: "Digital Sunset", genre: "Synthwave", artist: "DJ Smoke Stream" },
  "qKPgRU7LyU5jvP71": { title: "Infinite Loop", genre: "House", artist: "DJ Smoke Stream" },
  "AniMYS2hpJ3XsR8P": { title: "Smoke Signals", genre: "Electronic", artist: "DJ Smoke Stream" }
};

export const SUNO_PLAYLIST: SunoTrack[] = TRACK_IDS.map((id: string, index: number) => ({
  id,
  title: TRACK_METADATA[id]?.title || `Smoke Track ${index + 1}`,
  artist: TRACK_METADATA[id]?.artist || "DJ Smoke Stream",
  genre: TRACK_METADATA[id]?.genre || "Electronic",
  shareUrl: `https://suno.com/s/${id}`,
  streamUrl: `https://cdn1.suno.ai/${id}.mp3`,
  coverArt: `https://cdn1.suno.ai/image_${id}.png`,
  description: `A mesmerizing track from the Smoke Stream collection`,
  createdAt: new Date().toISOString(),
}));

/**
 * Get a track by ID
 */
export const getTrackById = (id: string): SunoTrack | undefined => {
  return SUNO_PLAYLIST.find(track => track.id === id);
};

/**
 * Get tracks by genre
 */
export const getTracksByGenre = (genre: string): SunoTrack[] => {
  return SUNO_PLAYLIST.filter(track => track.genre?.toLowerCase() === genre.toLowerCase());
};

/**
 * Shuffle playlist
 */
export const shufflePlaylist = (playlist: SunoTrack[]): SunoTrack[] => {
  const shuffled = [...playlist];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get next track index with repeat mode support
 */
export const getNextTrackIndex = (
  currentIndex: number,
  playlistLength: number,
  repeatMode: 'off' | 'one' | 'all' = 'all'
): number => {
  if (repeatMode === 'one') return currentIndex;
  if (repeatMode === 'off' && currentIndex === playlistLength - 1) return -1;
  return (currentIndex + 1) % playlistLength;
};

/**
 * Get previous track index
 */
export const getPreviousTrackIndex = (
  currentIndex: number,
  playlistLength: number
): number => {
  return (currentIndex - 1 + playlistLength) % playlistLength;
};
