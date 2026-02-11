'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OnboardingScreenProps {
  onEnter: () => void;
}

export default function OnboardingScreen({ onEnter }: OnboardingScreenProps) {
  const { colors } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show button after text animation
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const romanticMessage = `Tobes asking you to be my valentine...

Because you already are.

You make life easy. Falling in love with you was the easiest thing I could do. Every moment with you feels like a gift, and I can't imagine my life without you.

You are my forever valentine, today and always. ❤️`;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ background: colors.background }}
    >
      {/* Animated background hearts */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: colors.primary,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="w-8 h-8" fill={colors.primary} />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {/* Animated heart icon */}
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.3,
            type: 'spring',
            stiffness: 200 
          }}
          className="mb-8 flex justify-center"
          style={{ color: colors.primary }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 md:w-24 md:h-24" fill={colors.primary} />
          </motion.div>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            style={{ color: colors.text }}
          >
            Will You Be My Valentine?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl leading-relaxed whitespace-pre-line"
            style={{ color: colors.text, opacity: 0.9 }}
          >
            {romanticMessage.split('\n').map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                className="mb-4"
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

        {/* Enter button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="px-12 py-6 rounded-full text-xl md:text-2xl font-semibold text-white shadow-2xl flex items-center gap-4 mx-auto group"
            style={{ 
              background: colors.primary,
              boxShadow: `0 10px 40px ${colors.primary}60`
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
            </motion.div>
            <span>My Forever Valentine</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 md:w-8 md:h-8" fill="white" />
            </motion.div>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

