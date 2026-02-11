'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface Song {
  title: string;
  artist: string;
  reason: string;
  audioUrl?: string;
}

interface SongCardProps {
  song: Song;
  index: number;
  colors: any;
  isPlaying: boolean;
  onPlay: () => void;
}

function SongCard({ song, index, colors, isPlaying, onPlay }: SongCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: index % 2 === 0 ? -10 : 10 }}
      className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-4 cursor-pointer"
      style={{ 
        border: `2px solid ${colors.primary}`,
        boxShadow: `0 5px 20px ${colors.primary}30`
      }}
      onClick={onPlay}
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: colors.primary }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </motion.div>
        <div className="flex-1">
          <div 
            className="text-xl font-bold mb-1"
            style={{ color: colors.text }}
          >
            {song.title}
          </div>
          <div 
            className="text-base mb-2"
            style={{ color: colors.text, opacity: 0.7 }}
          >
            {song.artist}
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            {song.reason}
          </div>
        </div>
        {isPlaying && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-1 rounded-full"
            style={{ background: colors.primary }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function PlaylistSlide() {
  const { colors } = useTheme();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const playlist = [
    { 
      title: 'So Easy (To Fall In Love)', 
      artist: 'Olivia Dean', 
      reason: 'The perfect soundtrack to our love story',
      audioUrl: '/audio/so-easy-to-fall-in-love.mp3',
    },
    { 
      title: 'Perfect', 
      artist: 'Ed Sheeran', 
      reason: 'Reminds me of our first dance',
    },
    { 
      title: 'All of Me', 
      artist: 'John Legend', 
      reason: 'Every word feels true',
    },
    { 
      title: 'At Last', 
      artist: 'Etta James', 
      reason: 'You found me when I needed you most',
    },
  ];

  const handlePlay = (index: number) => {
    setPlayingIndex(playingIndex === index ? null : index);
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
        Our Playlist 🎵
      </motion.h2>

      <div className="max-w-2xl w-full">
        {playlist.map((song, index) => (
          <SongCard
            key={index}
            song={song}
            index={index}
            colors={colors}
            isPlaying={playingIndex === index}
            onPlay={() => handlePlay(index)}
          />
        ))}
      </div>
    </div>
  );
}

