'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Mode = 'valentine' | 'birthday' | 'anniversary';

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  animation: {
    timing: string;
    mood: string;
  };
}

const themeConfig: Record<Mode, ThemeContextType['colors'] & { animation: ThemeContextType['animation'] }> = {
  valentine: {
    primary: '#ff6b9d',
    secondary: '#ffb3d1',
    accent: '#ff1744',
    background: 'linear-gradient(135deg, #ffeef7 0%, #ffd6e8 100%)',
    text: '#8b1538',
    animation: {
      timing: '0.6s ease-out',
      mood: 'soft romantic',
    },
  },
  birthday: {
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#ffd23f',
    background: 'linear-gradient(135deg, #fff5e6 0%, #ffe0b3 100%)',
    text: '#cc5500',
    animation: {
      timing: '0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      mood: 'fun energetic',
    },
  },
  anniversary: {
    primary: '#9b59b6',
    secondary: '#8e44ad',
    accent: '#e74c3c',
    background: 'linear-gradient(135deg, #2c1810 0%, #1a0f0a 100%)',
    text: '#f8f8f8',
    animation: {
      timing: '0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      mood: 'cinematic emotional',
    },
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('valentine');

  const colors = themeConfig[mode];
  const animation = themeConfig[mode].animation;

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-text', colors.text);
  }, [mode, colors]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors, animation }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

