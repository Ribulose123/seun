'use client';

import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Phone, Laugh, Camera } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  delay: number;
  colors: any;
}

function StatCard({ icon, label, value, suffix, delay, colors }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay: delay,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, delay, count, rounded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
      style={{ 
        border: `2px solid ${colors.primary}`,
        boxShadow: `0 10px 40px ${colors.primary}40`
      }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4" style={{ color: colors.primary }}>
          {icon}
        </div>
        <div 
          className="text-5xl font-bold mb-2"
          style={{ color: colors.text }}
        >
          {displayValue.toLocaleString()}{suffix}
        </div>
        <div 
          className="text-lg font-medium"
          style={{ color: colors.text, opacity: 0.7 }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsSlide() {
  const { colors } = useTheme();

  const stats = [
    { icon: <Heart className="w-12 h-12" />, label: 'Days together', value: 365, suffix: '' },
    { icon: <Phone className="w-12 h-12" />, label: 'Hours on calls', value: 1200, suffix: '' },
    { icon: <Laugh className="w-12 h-12" />, label: 'Laughs shared', value: 5000, suffix: '+' },
    { icon: <Camera className="w-12 h-12" />, label: 'Photos taken', value: 2500, suffix: '+' },
  ];

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
        Our Story in Numbers
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            delay={index * 0.1}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
}

