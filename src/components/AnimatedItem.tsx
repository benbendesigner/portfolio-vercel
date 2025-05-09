'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedItemProps {
  children: ReactNode;
  index: number;
  delayFactor?: number;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ 
  children, 
  index, 
  delayFactor = 0.1 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          ease: "easeOut",
          delay: index * delayFactor
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem; 