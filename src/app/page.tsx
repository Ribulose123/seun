'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import OnboardingScreen from '@/components/OnboardingScreen';
import IntroSlide from '@/components/slides/IntroSlide';
import MomentsPlaylist from '@/components/slides/MomentsPlaylist';
import AwardsSlide from '@/components/slides/AwardsSlide';
import Navigation from '@/components/Navigation';
import AudioPlayer from '@/components/AudioPlayer';

// Valentine slides only
const slides = [
  IntroSlide,
  MomentsPlaylist,
  AwardsSlide,
];

export default function Home() {
  const { colors } = useTheme();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    setShowOnboarding(false);
    // Scroll to top when entering main content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Trigger audio play after user interaction (clicking the button)
      const audioElement = document.querySelector('audio') as HTMLAudioElement;
      if (audioElement) {
        audioElement.play().catch((error) => {
          console.log('Autoplay prevented:', error);
        });
      }
    }, 100);
  };

  // Scroll to slide
  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
      const slideElement = document.getElementById(`slide-${index}`);
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Intersection observer for slide detection
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = parseInt(entry.target.id.split('-')[1]);
            setCurrentSlide(slideIndex);
          }
        });
      },
      { threshold: 0.5 }
    );

    slides.forEach((_, index) => {
      const element = document.getElementById(`slide-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [mounted]);

  if (showOnboarding) {
    return <OnboardingScreen onEnter={handleEnter} />;
  }

  return (
    <div 
      ref={containerRef}
      className="relative overflow-x-hidden"
      style={{ 
        background: colors.background,
        transition: 'background 0.5s ease'
      }}
    >
      <AudioPlayer />

      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
        {slides.map((SlideComponent, index) => (
          <div
            key={index}
            id={`slide-${index}`}
            className="snap-start min-h-screen"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SlideComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>

      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={() => goToSlide(currentSlide + 1)}
        onPrev={() => goToSlide(currentSlide - 1)}
        onGoToSlide={goToSlide}
      />
    </div>
  );
}
