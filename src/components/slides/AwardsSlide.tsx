'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import confetti from 'canvas-confetti';
import { Smile, Crown, Utensils, Heart } from 'lucide-react';
import { useState } from 'react';

interface AwardCardProps {
  title: string;
  emoji: string;
  delay: number;
  colors: any;
  onClick: () => void;
}

function AwardCard({ title, emoji, delay, colors, onClick }: AwardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -180, scale: 0 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring',
        stiffness: 200 
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        boxShadow: `0 20px 60px ${colors.primary}80`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 cursor-pointer transition-all"
      style={{ 
        border: `3px solid ${colors.primary}`,
        boxShadow: isHovered 
          ? `0 20px 60px ${colors.primary}80` 
          : `0 10px 40px ${colors.primary}40`
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <div 
          className="text-2xl font-bold"
          style={{ color: colors.text }}
        >
          {title}
        </div>
      </div>
    </motion.div>
  );
}

export default function AwardsSlide() {
  const { colors } = useTheme();

  const awards = [
    { title: 'Best Smile', emoji: '😍', icon: <Smile /> },
    { title: 'Drama Queen', emoji: '😂', icon: <Crown /> },
    { title: 'Food Thief', emoji: '🍟', icon: <Utensils /> },
    { title: 'My Favorite Human', emoji: '💕', icon: <Heart /> },
  ];

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [colors.primary, colors.secondary, colors.accent],
    });
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ background: colors.background }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold mb-16 text-center"
        style={{ color: colors.text }}
      >
        Special Awards 🏆
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {awards.map((award, index) => (
          <AwardCard
            key={index}
            title={award.title}
            emoji={award.emoji}
            delay={index * 0.1}
            colors={colors}
            onClick={handleConfetti}
          />
        ))}
      </div>
    </div>
  );
}

