'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Memory {
  image: string;
  caption: string;
}

export default function MemoriesSlide() {
  const { colors } = useTheme();

  const memories = [
    { image: '/memories/mirror-selfie.jpg', caption: 'Our beautiful moments together ❤️' },
    { image: '/memories/selfie-together.jpg', caption: 'Making memories, one smile at a time' },
    { image: '/memories/mask-moment.jpg', caption: 'Laughing and loving together' },
    { image: '/memories/outdoor-selfie.jpg', caption: 'Adventures under the trees' },
    { image: '/memories/close-moment.jpg', caption: 'Forever and always, my love' },
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
        Our Memories 📸
      </motion.h2>

      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="memories-swiper"
        >
          {memories.map((memory, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-3xl overflow-hidden"
                style={{ 
                  width: '600px',
                  height: '400px',
                  boxShadow: `0 20px 60px ${colors.primary}40`
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={memory.image}
                    alt={memory.caption}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-br flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`
                    }}
                  >
                  </div>
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm"
                  style={{ color: 'white' }}
                >
                  <div className="text-xl font-semibold">{memory.caption}</div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .memories-swiper .swiper-pagination-bullet {
          background: ${colors.primary};
        }
        .memories-swiper .swiper-button-next,
        .memories-swiper .swiper-button-prev {
          color: ${colors.primary};
        }
      `}</style>
    </div>
  );
}

