'use client';

import { useState, useCallback } from 'react';
import { VisualizerSettings } from '../lib/types';
import { STORAGE_KEYS, THEME_COLORS, VISUALIZATION_MODES, THEMES } from '../lib/constants';

const DEFAULT_SETTINGS: VisualizerSettings = {
  mode: 'nebula',
  theme: 'purple',
  intensity: 1,
  particleCount: 2000,
  smoothing: 0.8,
  autoRotate: true,
  showFrequencyBands: true,
};

export const useVisualizerSettings = () => {
  const [settings, setSettings] = useState<VisualizerSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISUALIZER_MODE);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  /**
   * Save settings to localStorage
   */
  const saveSettings = useCallback((newSettings: VisualizerSettings) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.VISUALIZER_MODE, JSON.stringify(newSettings));
    }
  }, []);

  /**
   * Update a single setting
   */
  const updateSetting = useCallback(
    <K extends keyof VisualizerSettings>(key: K, value: VisualizerSettings[K]) => {
      const newSettings = { ...settings, [key]: value };
      saveSettings(newSettings);
    },
    [settings, saveSettings]
  );

  /**
   * Set visualization mode
   */
  const setMode = useCallback(
    (mode: VisualizerSettings['mode']) => {
      updateSetting('mode', mode);
    },
    [updateSetting]
  );

  /**
   * Set theme
   */
  const setTheme = useCallback(
    (theme: VisualizerSettings['theme']) => {
      updateSetting('theme', theme);
    },
    [updateSetting]
  );

  /**
   * Set intensity
   */
  const setIntensity = useCallback(
    (intensity: number) => {
      const clamped = Math.max(0, Math.min(2, intensity));
      updateSetting('intensity', clamped);
    },
    [updateSetting]
  );

  /**
   * Set particle count
   */
  const setParticleCount = useCallback(
    (count: number) => {
      updateSetting('particleCount', count);
    },
    [updateSetting]
  );

  /**
   * Set smoothing
   */
  const setSmoothing = useCallback(
    (smoothing: number) => {
      const clamped = Math.max(0, Math.min(1, smoothing));
      updateSetting('smoothing', clamped);
    },
    [updateSetting]
  );

  /**
   * Toggle auto rotate
   */
  const toggleAutoRotate = useCallback(() => {
    updateSetting('autoRotate', !settings.autoRotate);
  }, [settings.autoRotate, updateSetting]);

  /**
   * Toggle frequency bands display
   */
  const toggleFrequencyBands = useCallback(() => {
    updateSetting('showFrequencyBands', !settings.showFrequencyBands);
  }, [settings.showFrequencyBands, updateSetting]);

  /**
   * Get current theme colors
   */
  const getThemeColors = useCallback(() => {
    return THEME_COLORS[settings.theme];
  }, [settings.theme]);

  /**
   * Reset to defaults
   */
  const resetToDefaults = useCallback(() => {
    saveSettings(DEFAULT_SETTINGS);
  }, [saveSettings]);

  /**
   * Get all available modes
   */
  const getAvailableModes = useCallback(() => {
    return VISUALIZATION_MODES;
  }, []);

  /**
   * Get all available themes
   */
  const getAvailableThemes = useCallback(() => {
    return THEMES;
  }, []);

  return {
    settings,
    updateSetting,
    setMode,
    setTheme,
    setIntensity,
    setParticleCount,
    setSmoothing,
    toggleAutoRotate,
    toggleFrequencyBands,
    getThemeColors,
    resetToDefaults,
    getAvailableModes,
    getAvailableThemes,
  };
};
