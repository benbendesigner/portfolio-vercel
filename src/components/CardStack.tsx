'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards: Card[];
}

const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate dimensions for 9:16 aspect ratio (portrait)
  const cardWidth = 420;
  const cardHeight = Math.round(cardWidth * (16/9)); // 9:16 aspect ratio

  // Reset the auto-rotation timer
  const resetAutoRotate = () => {
    if (autoRotateTimer.current) {
      clearTimeout(autoRotateTimer.current);
    }
    
    autoRotateTimer.current = setTimeout(() => {
      rotateCards();
    }, 5000); // Rotate every 5 seconds
  };

  // Initial setup of auto-rotation
  useEffect(() => {
    resetAutoRotate();
    
    return () => {
      if (autoRotateTimer.current) {
        clearTimeout(autoRotateTimer.current);
      }
    };
  }, [activeIndex]);

  // Function to rotate cards
  const rotateCards = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Function to go to previous card
  const goToPrevCard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  // Function to get random offset for a card
  const getRandomOffset = (index: number) => {
    // Use a seed based on index to keep position consistent when cycling
    const seed = index * 137.5;
    const xOffset = Math.sin(seed) * 25;
    const yOffset = Math.cos(seed) * 15;
    return { x: xOffset, y: yOffset };
  };

  return (
    <div className="relative">
      {/* Card stack */}
      <div className="relative mx-auto" style={{ width: `${cardWidth + 120}px`, height: `${cardHeight + 60}px` }}>
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const distance = ((index - activeIndex + cards.length) % cards.length);
          const zIndex = cards.length - distance;
          const randomOffset = getRandomOffset(index);
          
          return (
            <motion.div
              key={card.id}
              className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-xl cursor-pointer"
              style={{ 
                width: cardWidth,
                height: cardHeight,
                zIndex,
                transformOrigin: 'center center',
                filter: isActive ? 'brightness(100%)' : `brightness(${95 - (distance * 5)}%)`,
              }}
              animate={{
                rotateZ: isActive ? 0 : Math.sin(index * 0.5) * 8,
                x: isActive ? 60 : 60 + randomOffset.x + (distance * 10),
                y: isActive ? 30 : 30 + randomOffset.y,
                scale: isActive ? 1 : 1 - (distance * 0.05),
                opacity: distance < 6 ? 1 : 0,
                boxShadow: isActive 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                  : `0 ${10 - distance * 1.5}px ${15 - distance * 2}px -5px rgba(0, 0, 0, 0.3)`
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30
              }}
              whileHover={{ scale: isActive ? 1.02 : 1 }}
              onClick={isActive ? undefined : () => setActiveIndex(index)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority={isActive}
                  className="transition-all duration-500 w-full h-full"
                />
                
                {/* Text overlay with gradient background */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-40 pb-8 px-6">
                  <h3 className="text-2xl font-heading font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="text-sm italic font-body text-gray-300">{card.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation controls */}
      <div className="absolute -bottom-14 left-0 right-0 flex justify-center items-center space-x-4">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-gray-700 text-white hover:bg-white/10 hover:border-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
          onClick={goToPrevCard}
          aria-label="Previous card"
        >
          <span className="text-sm">←</span>
        </button>
        
        <div className="flex space-x-3">
          {cards.map((_, idx) => (
            <button 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all focus:outline-none ${idx === activeIndex ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-gray-700 text-white hover:bg-white/10 hover:border-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
          onClick={rotateCards}
          aria-label="Next card"
        >
          <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
};

export default CardStack; 