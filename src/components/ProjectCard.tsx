'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  categories: string;
  imageContent?: React.ReactNode;
  imagePaths?: string[]; // Optional array of additional images to cycle through
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, categories, imageContent, imagePaths = [] }) => {
  const [isHovering, setIsHovering] = useState(false);
  // We'll just use the first image from the array
  const imagePath = imagePaths.length > 0 ? imagePaths[0] : null;

  return (
    <div 
      className="mb-12 cursor-pointer relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative transition-all duration-300 hover:shadow-[0_0_35px_rgba(60,60,60,0.5)]">
        {imagePath ? (
          <div className="w-full h-full relative">
            <Image
              src={imagePath}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className={`transition-all duration-500 ${isHovering ? 'scale-105 blur-sm' : ''}`}
            />
            
            {/* Coming Soon overlay - only visible on hover */}
            <div 
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="border border-white/40 rounded-full px-6 py-3"
                style={{ 
                  opacity: isHovering ? 1 : 0,
                  transform: isHovering ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                  transition: 'all 0.3s ease-out'
                }}
              >
                <span className="text-white font-heading uppercase tracking-wider text-sm font-medium">Coming Soon</span>
              </div>
            </div>
          </div>
        ) : imageContent ? (
          <div className="relative">
            <div className={`transition-all duration-500 ${isHovering ? 'blur-sm' : ''}`}>
              {imageContent}
            </div>
            
            {/* Coming Soon overlay - only visible on hover */}
            <div 
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="border border-white/40 rounded-full px-6 py-3"
                style={{ 
                  opacity: isHovering ? 1 : 0,
                  transform: isHovering ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                  transition: 'all 0.3s ease-out'
                }}
              >
                <span className="text-white font-heading uppercase tracking-wider text-sm font-medium">Coming Soon</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 relative">
            <span className={`text-gray-500 italic font-body transition-all duration-500 ${isHovering ? 'blur-sm' : ''}`}>{title}</span>
            
            {/* Coming Soon overlay - only visible on hover */}
            <div 
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="border border-white/40 rounded-full px-6 py-3"
                style={{ 
                  opacity: isHovering ? 1 : 0,
                  transform: isHovering ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                  transition: 'all 0.3s ease-out'
                }}
              >
                <span className="text-white font-heading uppercase tracking-wider text-sm font-medium">Coming Soon</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 className="font-heading text-[26px] font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm italic text-gray-400 font-body">{categories}</p>
    </div>
  );
};

export default ProjectCard; 