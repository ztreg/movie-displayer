'use client'

import Image from "next/image";
import { MovieProps } from '@/types/types'
import React from 'react'
import Link from "next/link";

const MovieCard = ( { movie } : MovieProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <Link href={`/movies/${movie.id}`} className="text-blue-500 hover:underline">
      <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'> #{ movie.vote_average}</h2>
        <h2 className='car-card__content-title'>{movie.title}</h2>
      </div>


      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={`${imageBaseUrl}${movie.poster_path}`} alt="image of movie" fill priority className='object-contain' />

      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-[14px]'>{movie.release_date}</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-[14px]'>{movie.vote_count}</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-[14px]'>{movie.popularity}</p>
          </div>
        </div>

      </div>
    </div>
  </Link>
  )
}

export default MovieCard