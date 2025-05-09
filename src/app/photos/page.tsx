'use client';

import FloatingNav from "@/components/FloatingNav";
import AnimatedSection from "@/components/AnimatedSection";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Photos() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const [visibleImages, setVisibleImages] = useState<{ [key: string]: boolean }>({});

  // Load photos from the Photos directory
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Loaded photos:', data.photos);
        setPhotos(data.photos);
      } catch (error) {
        console.error('Error loading photos:', error);
        setError('Failed to load photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      // Create background color transition
      gsap.to("body", {
        backgroundColor: "#ffffff",
        color: "#000000",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "top 80%",
          toggleActions: "play reverse play reverse",
          onEnter: () => setIsDark(false),
          onLeaveBack: () => setIsDark(true),
          scrub: 1
        },
      });

      // Set up intersection observer for images
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const photoId = entry.target.getAttribute('data-photo-id');
            if (photoId) {
              setVisibleImages(prev => ({
                ...prev,
                [photoId]: entry.isIntersecting
              }));
            }
          });
        },
        {
          rootMargin: '100px 0px',
          threshold: 0.1
        }
      );

      // Observe all image containers
      const imageContainers = containerRef.current.querySelectorAll('.image-container');
      imageContainers.forEach(container => observer.observe(container));

      return () => {
        imageContainers.forEach(container => observer.unobserve(container));
      };
    }
  }, [loading]);

  const handleImageError = (photo: string) => {
    console.error(`Failed to load image: ${photo}`);
    setError(`Failed to load image: ${photo}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <FloatingNav variant={isDark ? 'dark' : 'light'} currentPage="photos" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-8 py-8">
        <div className="h-24"></div>
        
        <AnimatedSection title="">
          <div className="py-12 flex flex-col justify-center mb-24">
            <h1 className={`font-heading text-6xl md:text-6xl lg:text-[92px] max-w-4xl font-semibold mb-8 leading-[1.1] tracking-tight hero-text transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Photography</h1>
            <p className={`text-sm italic max-w-3xl mb-4 font-body transition-colors duration-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              I love taking photos and videos wherever I go. It's a hobby I've had for a while and am always inspired by the world around me. 
            </p>
            <p className={`text-sm italic max-w-3xl mb-4 font-body transition-colors duration-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>As you might notice, I like to format my photos vertically, I really like the challenge of framing shots in a unique way, and since I believe most people see photography on their phones, why not format my pictures that way too?</p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 max-w-4xl mx-auto">
            {photos.map((photo, index) => (
              <AnimatedSection key={index} title="" delay={index * 0.08} className="mb-0">
                <div
                  className="image-container relative aspect-[1/2] overflow-hidden rounded-xl w-full"
                  data-photo-id={photo}
                >
                  <Image
                    src={`/images/Photos/${photo}`}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={() => handleImageError(photo)}
                    priority={index < 6}
                    quality={80}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 