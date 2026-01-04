export interface SunoTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  url: string;
  imageUrl: string;
}

// Replace these IDs with your actual Suno AI track IDs
const TRACK_IDS = [
  "8f9e6125-9c1a-4d33-8583-6c8f38c37715", // Example ID 1
  "562d45a1-4321-4bba-9912-33211aa77cc8", // Example ID 2
];

export const PLAYLIST: SunoTrack[] = TRACK_IDS.map((id) => ({
  id,
  title: `Suno Track ${id.slice(0, 4)}`, // Placeholder title
  artist: "AI Generated",
  genre: "Electronic / Cyberpunk",
  // Suno's public CDN structure
  url: `https://cdn1.suno.ai/${id}.mp3`,
  imageUrl: `https://cdn1.suno.ai/image_${id}.png`,
}));

export const getTrackById = (id: string) => 
  PLAYLIST.find((track) => track.id === id) || PLAYLIST[0];
