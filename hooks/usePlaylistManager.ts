'use client';

import { useState, useCallback } from 'react';
import { SunoTrack, SUNO_PLAYLIST, shufflePlaylist, getTracksByGenre } from '../lib/playlist';

interface PlaylistState {
  tracks: SunoTrack[];
  currentIndex: number;
  isShuffled: boolean;
  filteredGenre: string | null;
}

export const usePlaylistManager = () => {
  const [state, setState] = useState<PlaylistState>({
    tracks: SUNO_PLAYLIST,
    currentIndex: 0,
    isShuffled: false,
    filteredGenre: null,
  });

  /**
   * Shuffle the playlist
   */
  const shuffle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tracks: shufflePlaylist(prev.tracks),
      isShuffled: true,
    }));
  }, []);

  /**
   * Reset to original playlist
   */
  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tracks: SUNO_PLAYLIST,
      isShuffled: false,
      filteredGenre: null,
      currentIndex: 0,
    }));
  }, []);

  /**
   * Filter by genre
   */
  const filterByGenre = useCallback((genre: string | null) => {
    if (!genre) {
      setState((prev) => ({
        ...prev,
        tracks: SUNO_PLAYLIST,
        filteredGenre: null,
        currentIndex: 0,
      }));
    } else {
      const filtered = getTracksByGenre(genre);
      setState((prev) => ({
        ...prev,
        tracks: filtered,
        filteredGenre: genre,
        currentIndex: 0,
      }));
    }
  }, []);

  /**
   * Search tracks by title or artist
   */
  const search = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = SUNO_PLAYLIST.filter(
      (track) =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist?.toLowerCase().includes(lowerQuery)
    );
    setState((prev) => ({
      ...prev,
      tracks: filtered,
      currentIndex: 0,
    }));
  }, []);

  /**
   * Get unique genres
   */
  const getGenres = useCallback(() => {
    const genres = new Set<string>();
    SUNO_PLAYLIST.forEach((track) => {
      if (track.genre) genres.add(track.genre);
    });
    return Array.from(genres).sort();
  }, []);

  /**
   * Get current track
   */
  const getCurrentTrack = useCallback(() => {
    return state.tracks[state.currentIndex] || null;
  }, [state]);

  /**
   * Get next track
   */
  const getNextTrack = useCallback(() => {
    const nextIndex = (state.currentIndex + 1) % state.tracks.length;
    return state.tracks[nextIndex] || null;
  }, [state]);

  /**
   * Get previous track
   */
  const getPreviousTrack = useCallback(() => {
    const prevIndex = (state.currentIndex - 1 + state.tracks.length) % state.tracks.length;
    return state.tracks[prevIndex] || null;
  }, [state]);

  /**
   * Move to specific track
   */
  const goToTrack = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(0, Math.min(index, prev.tracks.length - 1)),
    }));
  }, []);

  /**
   * Get playlist stats
   */
  const getStats = useCallback(() => {
    return {
      totalTracks: state.tracks.length,
      currentIndex: state.currentIndex,
      isShuffled: state.isShuffled,
      filteredGenre: state.filteredGenre,
      genres: getGenres(),
    };
  }, [state, getGenres]);

  return {
    ...state,
    shuffle,
    reset,
    filterByGenre,
    search,
    getGenres,
    getCurrentTrack,
    getNextTrack,
    getPreviousTrack,
    goToTrack,
    getStats,
  };
};
