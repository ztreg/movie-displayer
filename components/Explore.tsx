'use client';

import { useRef } from 'react';
import { CarouselProps, Movie } from '@/types/types';
import MovieCard from './MovieCard';

const Explore = ({ movies, text }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 256, behavior: 'smooth', });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -256, behavior: 'smooth' });
    }

    
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <h1 className='flex justify-center text-2xl p-4 text-white font-bold'>{text}</h1>
      <div className="relative flex items-center">
        <button 
          onClick={prevSlide} 
          className="absolute left-[-62px] p-4 bg-black/60 text-white rounded-full text-3xl transform -translate-y-1/2 top-1/2 hover:bg-black/80 shadow-lg"
        >
          ❮
        </button>
        <div 
          ref={carouselRef} 
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 p-4 rounded-xl bg-black/30 backdrop-blur-md"
          style={{ scrollBehavior: 'smooth' }}
        >
          {movies?.map((movie: Movie, index) => (
              <div key={movie.id} className='text-center p-0 mb-1 font-semibold'>
                <MovieCard  movie={movie} type="explore" />
                {/* <h2 className=''>{index + 1}</h2> */}
              </div>
          ))}
        </div>
        <button 
          onClick={nextSlide} 
          className="absolute right-[-62px] p-4 bg-black/60 text-white rounded-full text-3xl transform -translate-y-1/2 top-1/2 hover:bg-black/80 shadow-lg"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Explore;
