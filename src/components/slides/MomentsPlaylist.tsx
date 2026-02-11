'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Moment {
  type: 'image' | 'video';
  src: string;
  caption: string;
  duration?: number; // Duration in seconds for images
}

export default function MomentsPlaylist() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moments: Moment[] = [
    { 
      type: 'image', 
      src: '/memories/images/image.jpg', 
      caption: 'Our beautiful moments together ❤️',
      duration: 4
    },
    { 
      type: 'image', 
      src: '/memories/images/image2.jpg', 
      caption: 'Making memories, one smile at a time',
      duration: 4
    },
    { 
      type: 'image', 
      src: '/memories/images/image3.jpg', 
      caption: 'Laughing and loving together',
      duration: 4
    },
    { 
      type: 'image', 
      src: '/memories/images/image4.jpg', 
      caption: 'Adventures under the trees',
      duration: 4
    },
    { 
      type: 'image', 
      src: '/memories/images/image5.jpg', 
      caption: 'Forever and always, my love',
      duration: 4
    },
  ];

  const currentMoment = moments[currentIndex];

  // Auto-advance to next moment
  useEffect(() => {
    if (!isPlaying) return;

    if (currentMoment.type === 'image') {
      // For images, wait for the duration then move to next
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % moments.length);
      }, (currentMoment.duration || 4) * 1000);
    } else if (currentMoment.type === 'video') {
      // For videos, wait for video to end
      const video = videoRef.current;
      if (video) {
        const handleEnded = () => {
          setCurrentIndex((prev) => (prev + 1) % moments.length);
        };
        video.addEventListener('ended', handleEnded);
        return () => video.removeEventListener('ended', handleEnded);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying, currentMoment, moments.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (currentMoment.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative"
      style={{ background: colors.background }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-8 text-center"
        style={{ color: colors.text }}
      >
        Our Moments 🎬
      </motion.h2>

      {/* Main collage display */}
      <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
        style={{ 
          boxShadow: `0 20px 60px ${colors.primary}40`
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {currentMoment.type === 'image' ? (
              <div className="relative w-full h-full">
                <Image
                  src={currentMoment.src}
                  alt={currentMoment.caption}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                {/* Fallback if image fails to load */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`,
                    display: 'none'
                  }}
                  id={`fallback-${currentIndex}`}
                >
                  <div className="text-6xl">📸</div>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={currentMoment.src}
                autoPlay
                loop={false}
                muted={false}
                playsInline
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Video error:', e);
                }}
              />
            )}
            
            {/* Overlay with caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-2xl md:text-3xl font-bold"
                >
                  {currentMoment.caption}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all z-10"
          style={{ color: 'white' }}
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all z-10"
          style={{ color: 'white' }}
        >
          →
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all z-10"
          style={{ color: 'white' }}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex gap-2 mt-8">
        {moments.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8' : 'w-2'
            }`}
            style={{
              background: index === currentIndex ? colors.primary : colors.secondary,
              opacity: index === currentIndex ? 1 : 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
}

