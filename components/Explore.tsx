'use client';

import { useRef, useState, useEffect } from 'react';
import { CarouselProps, Movie } from '@/types/types';
import MovieCard from './MovieCard';

const Explore = ({ movies, text }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const nextSlide = () => {
    carouselRef.current?.scrollBy({ left: 236, behavior: 'smooth' });
  };

  const prevSlide = () => {
    carouselRef.current?.scrollBy({ left: -250, behavior: 'smooth' });
  };

  // Check if carousel is scrollable
  useEffect(() => {
    if (carouselRef.current) {
      const checkScroll = () => {
        if (carouselRef.current) {
          const isScrollable = carouselRef.current.scrollWidth > carouselRef.current.clientWidth;
          setIsScrolling(isScrollable);
        }
      };

      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <h1 className="text-2xl p-4 text-white font-bold">{text}</h1>
      <div className="relative flex items-center group">
        {/* Left arrow button */}
        {isScrolling && (
          <button 
            onClick={prevSlide} 
            className="absolute left-0 p-4 bg-black/60 text-white rounded-full text-3xl transform -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/80 shadow-lg z-10"
          >
            ❮
          </button>
        )}

      {/* Carousel container */}
      <div 
        ref={carouselRef} 
        className={`flex gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 p-4 rounded-xl 
          ${text === "Trending Movies" ? "bg-red-700/60" : "bg-blue-700/60"} backdrop-blur-md`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {movies?.map((movie: Movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[220px]">
            <MovieCard movie={movie} type="explore" />
          </div>
        ))}
      </div>


        {/* Right arrow button */}
        {isScrolling && (
          <button 
            onClick={nextSlide} 
            className="absolute right-0 p-4 bg-black/60 text-white rounded-full text-3xl transform -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/80 shadow-lg z-10"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

export default Explore;
