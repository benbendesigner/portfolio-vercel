'use client';

import React, { useState, useEffect } from 'react';

interface FloatingNavProps {
  variant?: 'dark' | 'light';
  currentPage?: 'design' | 'photos' | 'writing';
}

const FloatingNav: React.FC<FloatingNavProps> = ({ 
  variant = 'dark',
  currentPage = 'design'
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bgColor = variant === 'dark' ? 'bg-black/80' : 'bg-white/80';
  const borderColor = variant === 'dark' ? 'border-gray-800' : 'border-gray-300';
  const textColor = variant === 'dark' ? 'text-white' : 'text-black';
  const textHoverColor = variant === 'dark' ? 'hover:text-red-300' : 'hover:text-red-600';
  const isDark = variant === 'dark';

  return (
    <header 
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
        ${scrolled ? 'py-4 top-4' : 'py-6'} 
        rounded-full px-6
        transition-all duration-300 ease-in-out
        backdrop-blur-md ${bgColor}
        border ${borderColor}
        shadow-lg
        max-w-3xl w-auto
      `}
    >
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className={`font-heading font-semibold text-md ${textColor}`}>
            BENBEN
          </div>
          
          <nav className="ml-12">
            <ul className="flex items-center space-x-2 md:space-x-3">
              <li className={`text-xs italic font-body ${currentPage === 'design' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : 'hover:text-purple-300'} px-4 py-2 rounded-full transition-colors cursor-pointer ${currentPage === 'design' ? '' : textColor}`}>
                <a href="/" className={currentPage === 'design' ? (isDark ? 'text-black' : 'text-white') : ''}>Design</a>
              </li>
              <li className={`text-xs italic font-body ${currentPage === 'photos' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : 'hover:text-purple-300'} px-4 py-2 rounded-full transition-colors cursor-pointer ${currentPage === 'photos' ? '' : textColor}`}>
                <a href="/photos" className={currentPage === 'photos' ? (isDark ? 'text-black' : 'text-white') : ''}>Photos</a>
              </li>
              <li className={`text-xs italic font-body ${currentPage === 'writing' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : 'hover:text-purple-300'} px-4 py-2 rounded-full transition-colors cursor-pointer ${currentPage === 'writing' ? '' : textColor}`}>
                <a href="/writing" className={currentPage === 'writing' ? (isDark ? 'text-black' : 'text-white') : ''}>Writing</a>
              </li>
              <li 
                className={`border ${isDark ? 'border-gray-700 text-white' : 'border-gray-300 text-black'} px-4 py-2 rounded-full text-xs italic font-body hover:bg-white/10 hover:border-white transition-colors cursor-pointer`} 
                onClick={() => window.location.href = 'mailto:hi@benbensorensen.com'}
              >
                Contact
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx global>{`
        .floatingnav-variant a {
          color: ${variant === 'dark' ? 'white' : 'black'};
        }
        
        .floatingnav-variant li:not(.bg-white):not([class*="border"]) {
          color: ${variant === 'dark' ? 'white' : 'black'};
        }
        
        .floatingnav-variant li:not(.bg-white):not([class*="border"]):hover {
          color: ${variant === 'dark' ? '#d1d5db' : '#4b5563'};
        }
        
        .floatingnav-variant li.bg-white {
          background-color: ${variant === 'dark' ? 'white' : 'black'};
          color: ${variant === 'dark' ? 'black' : 'white'};
        }
        
        .floatingnav-variant li.bg-white:hover {
          background-color: ${variant === 'dark' ? '#e5e7eb' : '#1f2937'};
        }
        
        .floatingnav-variant li[class*="border"] {
          border-color: ${variant === 'dark' ? '#374151' : '#d1d5db'};
          color: ${variant === 'dark' ? 'white' : 'black'};
        }
        
        .floatingnav-variant li[class*="border"]:hover {
          border-color: ${variant === 'dark' ? 'white' : 'black'};
        }
      `}</style>
    </header>
  );
};

export default FloatingNav; 