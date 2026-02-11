'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Particle {
  width: number;
  height: number;
  left: number;
  top: number;
  xOffset: number;
  duration: number;
  delay: number;
}

export default function IntroSlide() {
  const { colors, animation } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client side
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        width: Math.random() * 100 + 20,
        height: Math.random() * 100 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Background image/video */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{ background: colors.background }}
        />
        {/* Background video - plays automatically, muted */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          onError={(e) => {
            // Hide video if it doesn't exist, show image instead
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
          }}
        >
          <source src="/memories/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback background image if video doesn't exist */}
        <div className="absolute inset-0">
          <Image
            src="/memories/mirror-selfie.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30"
            unoptimized
            onError={(e) => {
              // Hide image if it doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        {/* Overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, ${colors.primary}20, ${colors.background}80)`
          }}
        />
      </div>

      {/* Animated background particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden z-10">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                background: colors.primary,
                width: particle.width,
                height: particle.height,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, particle.xOffset, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 text-center"
      >
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: 'spring',
            stiffness: 200 
          }}
          className="mb-8 flex justify-center"
          style={{ color: colors.primary }}
        >
          <Heart className="w-16 h-16" fill={colors.primary} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          Take a Journey Into Our World
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg"
          style={{ color: colors.text, opacity: 0.6 }}
        >
          Scroll to continue →
        </motion.div>
      </motion.div>
    </div>
  );
}

