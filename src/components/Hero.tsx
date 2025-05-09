'use client';

import { ReactNode, useRef, useEffect, useState, useCallback } from 'react';
import AnimatedSection from './AnimatedSection';
import ScrollToContactButton from './ScrollToContactButton';

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

const Hero = ({ title, subtitle }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pixelSize = 24; // Size of each pixel in the pixelation effect
  const [currentProgress, setCurrentProgress] = useState(0);
  const lastFrameTime = useRef(0);
  const animationFrameId = useRef<number>(0);
  const blendCanvas = useRef<HTMLCanvasElement | null>(null);
  const tempCanvas = useRef<HTMLCanvasElement | null>(null);
  const highlightCanvas = useRef<HTMLCanvasElement | null>(null);
  const targetProgress = useRef(0);
  const currentProgressRef = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const highlightRadius = 60; // Radius of the highlight effect

  // Initialize canvases
  useEffect(() => {
    // Create canvases but don't append to DOM
    const createCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.visibility = 'hidden';
      canvas.style.left = '-9999px';
      canvas.style.top = '-9999px';
      return canvas;
    };
    
    blendCanvas.current = createCanvas();
    tempCanvas.current = createCanvas();
    highlightCanvas.current = createCanvas();
  }, []);

  // Load images with priority
  useEffect(() => {
    const imagePaths = [
      '/images/hero/hero_01.png',
      '/images/hero/hero_02.png',
      '/images/hero/hero_03.png',
      '/images/hero/hero_04.png'
    ];

    const loadImages = async () => {
      const loadedImages = await Promise.all(
        imagePaths.map((src, index) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            // Load first image immediately, others with lower priority
            img.fetchPriority = index === 0 ? 'high' : 'low';
            img.src = src;
          });
        })
      );
      setImages(loadedImages);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    
    targetProgress.current = progress;
    mousePosition.current = { x, y };
  }, []);

  // Optimized draw function
  const drawPixelated = useCallback((
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    alpha: number = 1
  ) => {
    const { width, height } = canvas;
    
    // Calculate best fit to cover canvas
    const scale = Math.max(width / img.width, height / img.height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    const offsetX = (width - scaledWidth) / 2 + width * 0.2; // Offset to the right
    const offsetY = (height - scaledHeight) / 2;

    if (!tempCanvas.current) return;
    
    // First draw at pixelated size
    const pixelatedWidth = Math.ceil(scaledWidth / pixelSize);
    const pixelatedHeight = Math.ceil(scaledHeight / pixelSize);
    
    tempCanvas.current.width = pixelatedWidth;
    tempCanvas.current.height = pixelatedHeight;
    const tempCtx = tempCanvas.current.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return;

    // Draw image at small size first
    tempCtx.clearRect(0, 0, pixelatedWidth, pixelatedHeight);
    tempCtx.drawImage(img, 0, 0, pixelatedWidth, pixelatedHeight);

    // Apply the alpha if needed
    if (alpha < 1) {
      ctx.globalAlpha = alpha;
    }
    
    // Draw to main canvas with pixelation
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      tempCanvas.current,
      0, 0, pixelatedWidth, pixelatedHeight,
      offsetX, offsetY, scaledWidth, scaledHeight
    );
    ctx.imageSmoothingEnabled = true;
    
    // Reset alpha
    if (alpha < 1) {
      ctx.globalAlpha = 1;
    }
  }, [pixelSize]);

  // Draw pixelated highlight effect
  const drawHighlight = useCallback((
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    if (!highlightCanvas.current) return;
    const { x, y } = mousePosition.current;
    const { width, height } = canvas;

    // Set up highlight canvas
    highlightCanvas.current.width = width;
    highlightCanvas.current.height = height;
    const highlightCtx = highlightCanvas.current.getContext('2d', { willReadFrequently: true });
    if (!highlightCtx) return;

    // Create gradient for highlight
    const gradient = highlightCtx.createRadialGradient(x, y, 0, x, y, highlightRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // Draw highlight
    highlightCtx.fillStyle = gradient;
    highlightCtx.fillRect(0, 0, width, height);

    // Pixelate the highlight
    const pixelatedWidth = Math.ceil(width / pixelSize);
    const pixelatedHeight = Math.ceil(height / pixelSize);

    // Create temporary canvas for pixelation
    if (!tempCanvas.current) return;
    tempCanvas.current.width = pixelatedWidth;
    tempCanvas.current.height = pixelatedHeight;
    const tempCtx = tempCanvas.current.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return;

    // Draw highlight at small size
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(highlightCanvas.current, 0, 0, pixelatedWidth, pixelatedHeight);

    // Draw pixelated highlight back to main canvas with inverse blend mode
    ctx.save();
    ctx.globalCompositeOperation = 'difference';
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      tempCanvas.current,
      0, 0, pixelatedWidth, pixelatedHeight,
      0, 0, width, height
    );
    ctx.restore();
  }, [pixelSize, highlightRadius]);

  // Main draw loop with smooth interpolation
  const drawFrame = useCallback((timestamp: number) => {
    if (!canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate which images to blend
    const totalImages = images.length;
    const imageIndex = currentProgressRef.current * (totalImages - 1);
    const index1 = Math.floor(imageIndex);
    const index2 = Math.min(index1 + 1, totalImages - 1);
    const blend = imageIndex - index1;

    // Draw first image
    drawPixelated(ctx, images[index1], canvas);
    
    // Blend with second image if needed
    if (index1 !== index2 && blend > 0) {
      drawPixelated(ctx, images[index2], canvas, blend);
    }

    // Add dark overlay for better text contrast
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update progress
    const delta = targetProgress.current - currentProgressRef.current;
    currentProgressRef.current += delta * 0.15;
    setCurrentProgress(currentProgressRef.current);

    animationFrameId.current = requestAnimationFrame(drawFrame);
  }, [images, drawPixelated]);

  // Set up canvas and event listeners
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Set up canvas size
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', handleMouseMove);
    animationFrameId.current = requestAnimationFrame(drawFrame);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [images, handleMouseMove, drawFrame]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden"
      style={{ height: '700px' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block' // Ensure canvas is block-level
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-4xl px-6">
          <h1 className="font-heading text-6xl md:text-6xl lg:text-[92px] font-semibold mb-8 leading-[1.1] tracking-tight hero-text">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm italic text-gray-400 mb-4 font-body">
              {subtitle}
            </p>
          )}
          <div className="mt-8">
            <ScrollToContactButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 