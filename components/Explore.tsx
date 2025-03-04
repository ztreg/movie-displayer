'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CarouselProps, Movie } from '@/types/types';
import MovieCard from './MovieCard';

const images = [
    { src: '/close.svg', title: 'Movie 1' },
    { src: '/car-logo.svg', title: 'Movie 2' },
    { src: '/globe.svg', title: 'Movie 3' },
    { src: '/hero.png', title: 'Movie 4' },
    { src: '/logo.svg', title: 'Movie 5' },
    { src: '/linkedin.svg', title: 'Movie 6' },
    { src: '/heart-filled.svg', title: 'Movie 7' },
    { src: '/facebook.svg', title: 'Movie 8' },
    { src: '/github.svg', title: 'Movie 9' },
  ];
  


const Explore = ({ movies }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className=" pt-20 md-4 relative w-full max-w-4xl mx-auto overflow-hidden ">
      <div className="flex items-center justify-center gap-4">
        <button onClick={prevSlide} className="absolute left-4 p-2 bg-black/50 text-white rounded-full">❮</button>
        <div className="flex gap-2 overflow-hidden w-full">
            {movies?.map((movie: Movie) => (
               <MovieCard key={movie.id} movie={movie} />
               )
             )}
        </div>
        <button onClick={nextSlide} className="absolute right-4 p-2 bg-black/50 text-white rounded-full">❯</button>
      </div>
    </div>
  );
};

export default Explore;
