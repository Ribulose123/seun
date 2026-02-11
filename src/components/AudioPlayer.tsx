'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';

export default function AudioPlayer() {
  const { colors } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Audio URL for valentine mode - "So Easy (To Fall In Love)" by Olivia Dean
  const audioUrl = '/audio/Olivia_Dean_-_So_Easy_To_Fall_In_Love_(mp3.pm).mp3.mpeg';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume to 50% by default
    audio.volume = 0.5;

    // Handle audio errors
    const handleError = () => {
      console.error('Audio error:', audio.error);
      setHasError(true);
    };

    // Handle when audio can play
    const handleCanPlay = () => {
      setHasError(false);
      // Auto-play when audio is ready (after user interaction)
      const tryAutoPlay = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay was prevented - user needs to interact first
          console.log('Autoplay prevented, waiting for user interaction');
        }
      };
      tryAutoPlay();
    };

    // Try to play immediately when component mounts
    const tryInitialPlay = async () => {
      try {
        audio.volume = 0.5;
        await audio.play();
        setIsPlaying(true);
        setHasError(false);
      } catch (error) {
        // Autoplay prevented - will play on first user interaction
        console.log('Initial autoplay prevented');
      }
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    
    // Try to play when audio is loaded
    if (audio.readyState >= 2) {
      tryInitialPlay();
    } else {
      audio.addEventListener('loadeddata', tryInitialPlay, { once: true });
    }

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Ensure volume is set
        audio.volume = 0.5;
        await audio.play();
        setIsPlaying(true);
        setHasError(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setHasError(true);
      // Try to load the audio again
      audio.load();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="fixed bottom-8 right-8 z-50 flex gap-2">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
          style={{ 
            background: colors.primary,
            color: 'white'
          }}
          title={hasError ? 'Audio file not found. Please check /public/audio/ folder' : isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl bg-white/90 backdrop-blur-lg"
          style={{ color: colors.primary }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      </div>
      {hasError && (
        <div className="fixed bottom-24 right-8 z-50 bg-red-500 text-white px-4 py-2 rounded-lg text-sm max-w-xs">
          Audio file not found. Check /public/audio/ folder for: Olivia_Dean_-_So_Easy_To_Fall_In_Love_(mp3.pm).mp3.mpeg
        </div>
      )}
    </>
  );
}

