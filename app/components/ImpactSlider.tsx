'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { fetchUnsplashImages } from '../utils/unsplash';
import DonateButton from './DonateButton';

interface SliderImage {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

interface ImpactSliderProps {
  className?: string;
}

export default function ImpactSlider({ className = '' }: ImpactSliderProps) {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Impact messages that will overlay on images
  const impactMessages = [
    "Breaking the Silence",
    "We never spoke of it. We whispered about it. We're changing it.",
    "For generations, women have carried the weight of unspoken struggles",
    "Today, we're creating a movement where every voice matters",
    "Every woman can stand in her power"
  ];

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        // Try multiple search terms to get diverse animated/artistic images
        const searchTerms = [
          'women empowerment illustration art',
          'community together animated style',
          'feminine strength digital art',
          'women solidarity illustration',
          'empowerment art community'
        ];
        
        // Fetch images with different search terms
        const allImages = [];
        for (const term of searchTerms) {
          const images = await fetchUnsplashImages(term, 1);
          allImages.push(...images);
        }
        
        // Shuffle and take first 5
        const shuffled = allImages.sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 5));
      } catch (error) {
        console.error('Error loading images:', error);
        // Fallback to placeholder images if API fails
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className={`relative h-96 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Loading impact stories...</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={`relative h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Impact in Action</h2>
          <p className="text-muted">Transforming lives through menstrual health education</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Main Slider Container */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${images[currentIndex]?.urls.regular})`
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay - Mobile-first responsive layout */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                {/* Left Side - Main Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
                    {impactMessages[0]}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 leading-relaxed">
                    {impactMessages[currentIndex + 1] || impactMessages[1]}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <Link 
                      to="/contact"
                      className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-sm sm:text-base lg:text-lg text-center"
                    >
                      Join the Movement
                    </Link>
                    <DonateButton 
                      className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-sm sm:text-base lg:text-lg"
                      amount={500}
                    >
                      Donate for Dignity
                    </DonateButton>
                  </div>
                  
                  {/* Impact Statistics */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-white">
                    <div className="text-center flex-1 min-w-[80px]">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-300">85,000+</div>
                      <div className="text-xs sm:text-sm text-white/80">Women Reached</div>
                    </div>
                    <div className="text-center flex-1 min-w-[80px]">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-300">200+</div>
                      <div className="text-xs sm:text-sm text-white/80">Leaders Trained</div>
                    </div>
                    <div className="text-center flex-1 min-w-[80px]">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-300">19</div>
                      <div className="text-xs sm:text-sm text-white/80">States Impacted</div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Dialogue Bubbles - Hidden on mobile, shown on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="relative hidden lg:block"
                >
                  <div className="bg-gradient-to-br from-pink-100 to-teal-100 rounded-2xl p-6 lg:p-8 relative">
                    {/* Dialogue Bubbles */}
                    <div className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-white rounded-full px-3 py-2 lg:px-4 shadow-lg">
                      <p className="text-xs lg:text-sm text-gray-700">"We never spoke of it."</p>
                      <p className="text-xs text-gray-500">— grandmother</p>
                    </div>
                    <div className="absolute top-12 right-3 lg:top-16 lg:right-4 bg-white rounded-full px-3 py-2 lg:px-4 shadow-lg">
                      <p className="text-xs lg:text-sm text-gray-700">"We whispered about it."</p>
                      <p className="text-xs text-gray-500">— mother</p>
                    </div>
                    <div className="absolute bottom-12 left-3 lg:bottom-16 lg:left-4 bg-white rounded-full px-3 py-2 lg:px-4 shadow-lg">
                      <p className="text-xs lg:text-sm text-gray-700">"We're changing it."</p>
                      <p className="text-xs text-gray-500">— daughter</p>
                    </div>
                    
                    {/* Central Element */}
                    <div className="flex flex-col items-center justify-center h-24 lg:h-32">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center mb-2">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-full"></div>
                      </div>
                      <p className="text-primary font-semibold text-center text-sm lg:text-base">Community Together</p>
                      <p className="text-gray-600 text-xs lg:text-sm text-center">Building bridges, creating change</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Navigation Arrows - Mobile optimized */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots - Mobile optimized */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Image Counter - Mobile optimized */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/20 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Image Attribution */}
      {images[currentIndex] && (
        <div className="absolute bottom-2 left-4 text-white/70 text-xs">
          Photo by {images[currentIndex].user.name} on Unsplash
        </div>
      )}
    </div>
  );
}
