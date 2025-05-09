'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  title, 
  children, 
  delay = 0,
  className = "mb-36"
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut',
        delay: delay + 0.2
      } 
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative ${className}`}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {title && (
          <div className="uppercase text-xs font-medium font-body mb-4 bg-white text-black py-1 px-3 inline-block rounded">
            {title}
          </div>
        )}
        
        {children}
      </motion.div>
    </section>
  );
};

export default AnimatedSection; 