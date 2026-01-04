'use client';

import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/lib/store';

export const useAudioAnalyzer = (audioElement: HTMLAudioElement | null) => {
  const setFrequencyData = useAudioStore((state) => state.setFrequencyData);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!audioElement) return;

    // 1. Initialize Web Audio API context
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    
    // 2. Create Analyser Node
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256; // Controls detail level (128 bars of data)
    
    // 3. Connect the Audio Source to the Analyzer
    // IMPORTANT: crossOrigin = "anonymous" must be set on the audio element elsewhere
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    
    analyzerRef.current = analyzer;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 4. Update loop: Runs every frame (~60fps)
    const update = () => {
      if (analyzerRef.current) {
        analyzerRef.current.getByteFrequencyData(dataArray);
        // Copy data to avoid reference issues in state
        setFrequencyData(new Uint8Array(dataArray));
      }
      animationFrameRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      audioContext.close();
    };
  }, [audioElement, setFrequencyData]);
};
