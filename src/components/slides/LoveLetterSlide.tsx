'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import confetti from 'canvas-confetti';
import { Heart, Mail, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function LoveLetterSlide() {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const loveLetter = `My Dearest Love,

From the moment you entered my life, everything changed. You brought colors to my world that I never knew existed.

Every day with you is a gift. Your smile lights up my darkest days, your laugh is my favorite sound, and your presence makes anywhere feel like home.

I love the way you...
- Get excited about the little things
- Make me laugh even when I'm trying to be serious
- Support me in everything I do
- Love me unconditionally, flaws and all

You are my best friend, my partner, my everything. I can't imagine my life without you, and I don't want to.

Thank you for being you. Thank you for choosing me. Thank you for every moment we've shared and every moment yet to come.

With all my love,
Forever yours ❤️`;

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.5 },
      colors: [colors.primary, colors.secondary, colors.accent],
    });
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ background: colors.background }}
    >
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 flex justify-center"
            style={{ color: colors.primary }}
          >
            <Mail className="w-24 h-24" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8"
            style={{ color: colors.text }}
          >
            A Letter for You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl mb-12"
            style={{ color: colors.text, opacity: 0.8 }}
          >
            Open when you're ready ❤️
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="px-12 py-6 rounded-full text-2xl font-semibold text-white shadow-2xl flex items-center gap-4 mx-auto"
            style={{ 
              background: colors.primary,
              boxShadow: `0 10px 40px ${colors.primary}60`
            }}
          >
            <Heart className="w-8 h-8" fill="white" />
            Open Letter
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl"
        >
          <motion.div
            className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl"
            style={{ border: `3px solid ${colors.primary}` }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
                style={{ color: colors.primary }}
              >
                <Heart className="w-16 h-16" fill={colors.primary} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg leading-relaxed whitespace-pre-line"
              style={{ color: colors.text }}
            >
              {loveLetter}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center mt-8"
              style={{ color: colors.primary }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

