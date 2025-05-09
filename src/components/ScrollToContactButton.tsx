'use client';

import { useCallback } from 'react';

const ScrollToContactButton = () => {
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
      const headerOffset = 100;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <button
      onClick={scrollToContact}
      className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium italic font-body transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
    >
      Get in Touch
    </button>
  );
};

export default ScrollToContactButton; 