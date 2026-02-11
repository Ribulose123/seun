'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToSlide: (index: number) => void;
}

export default function Navigation({ 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev,
  onGoToSlide 
}: NavigationProps) {
  const { colors } = useTheme();
  const [showNav, setShowNav] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setShowNav(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Slide indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onGoToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'w-8' : ''
            }`}
            style={{
              background: currentSlide === index ? colors.primary : colors.secondary,
              opacity: currentSlide === index ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {mounted && showNav && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4">
          {currentSlide > 0 && (
            <motion.button
              onClick={onPrev}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
              style={{ 
                background: colors.primary,
                color: 'white'
              }}
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
          {currentSlide < totalSlides - 1 && (
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1, y: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
              style={{ 
                background: colors.primary,
                color: 'white'
              }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      )}
    </>
  );
}

