'use client';

import { useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from './useAudioPlayer';
import { FrequencyData } from '../lib/types';
import { AUDIO_CONFIG } from '../lib/constants';

export const useAudioAnalyzer = () => {
  const { audio } = useAudioPlayer();
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const waveformArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!audio || analyzerRef.current) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContext();
      contextRef.current = context;

      const analyzer = context.createAnalyser();
      analyzer.fftSize = AUDIO_CONFIG.FFT_SIZE;
      analyzer.smoothingTimeConstant = AUDIO_CONFIG.SMOOTHING_TIME_CONSTANT;
      analyzer.minDecibels = AUDIO_CONFIG.MIN_DECIBELS;
      analyzer.maxDecibels = AUDIO_CONFIG.MAX_DECIBELS;

      // Connect the audio element to the analyzer
      const source = context.createMediaElementSource(audio);
      source.connect(analyzer);
      analyzer.connect(context.destination);

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const waveformArray = new Uint8Array(bufferLength);

      analyzerRef.current = analyzer;
      dataArrayRef.current = dataArray;
      waveformArrayRef.current = waveformArray;
      sourceRef.current = source;

      setIsInitialized(true);
    } catch (err) {
      console.error('Audio Analyzer failed to initialize:', err);
    }
  }, [audio]);

  /**
   * Get frequency data with advanced analysis
   */
  const getFrequencyData = (): FrequencyData => {
    if (!analyzerRef.current || !dataArrayRef.current) {
      return {
        average: 0,
        peak: 0,
        frequencies: new Uint8Array(),
        bass: 0,
        mid: 0,
        treble: 0,
      };
    }

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
    const data = dataArrayRef.current;

    // Calculate average
    const average = data.reduce((a, b) => a + b, 0) / data.length;

    // Find peak
    const peak = Math.max(...data);

    // Calculate frequency bands
    const quarterLength = Math.floor(data.length / 4);
    const bass = data.slice(0, quarterLength).reduce((a, b) => a + b, 0) / quarterLength;
    const mid = data
      .slice(quarterLength, quarterLength * 2)
      .reduce((a, b) => a + b, 0) / quarterLength;
    const treble = data
      .slice(quarterLength * 2, quarterLength * 3)
      .reduce((a, b) => a + b, 0) / quarterLength;

    return {
      average,
      peak,
      frequencies: new Uint8Array(data),
      bass,
      mid,
      treble,
    };
  };

  /**
   * Get waveform data
   */
  const getWaveformData = (): Uint8Array => {
    if (!analyzerRef.current || !waveformArrayRef.current) {
      return new Uint8Array();
    }

    analyzerRef.current.getByteTimeDomainData(waveformArrayRef.current);
    return new Uint8Array(waveformArrayRef.current);
  };

  /**
   * Get average frequency
   */
  const getAverageFrequency = (): number => {
    if (!analyzerRef.current || !dataArrayRef.current) return 0;

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;
    return average;
  };

  /**
   * Get peak frequency
   */
  const getPeakFrequency = (): number => {
    if (!analyzerRef.current || !dataArrayRef.current) return 0;

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
    return Math.max(...dataArrayRef.current);
  };

  /**
   * Get frequency bands
   */
  const getFrequencyBands = (): { bass: number; mid: number; treble: number } => {
    if (!analyzerRef.current || !dataArrayRef.current) {
      return { bass: 0, mid: 0, treble: 0 };
    }

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
    const data = dataArrayRef.current;
    const quarterLength = Math.floor(data.length / 4);

    const bass = data.slice(0, quarterLength).reduce((a, b) => a + b, 0) / quarterLength;
    const mid = data
      .slice(quarterLength, quarterLength * 2)
      .reduce((a, b) => a + b, 0) / quarterLength;
    const treble = data
      .slice(quarterLength * 2, quarterLength * 3)
      .reduce((a, b) => a + b, 0) / quarterLength;

    return { bass, mid, treble };
  };

  /**
   * Resume audio context if suspended
   */
  const resumeContext = async () => {
    if (contextRef.current && contextRef.current.state === 'suspended') {
      await contextRef.current.resume();
    }
  };

  return {
    getFrequencyData,
    getWaveformData,
    getAverageFrequency,
    getPeakFrequency,
    getFrequencyBands,
    resumeContext,
    isInitialized,
  };
};
