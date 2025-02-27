"use client";

import Image from "next/image";
import { MovieDetailsProps } from "@/types/types";
import { useState } from "react";
import { VideoPlayer, Category } from "./index";

const MovieDetails = ({ movie, trailers }: MovieDetailsProps) => {
    const [imageError, setImageError] = useState(false);
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    
  return (
    <div className="movie__details-wrapper h-auto">
      <div className="movie__details-content group text-blue-500">
        <div className="car-card__content">
          <h2 className="text-[22px] leading-[26px] font-bold capitalize">
            {movie.title}
          </h2> 
        </div>
        <div className="relative w-full h-auto my-2 flex gap-4 flex-row flex-wrap">
          <Image
            src={ !imageError && movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : "/no-image.svg" }
            alt="image of movie"
            sizes="5"
            width={220}
            height={40}
            priority
            className="object-contain flex"
            onError={() => setImageError(true)} // If error, show fallback
          />
          
        {
            trailers?.length && ( <VideoPlayer videoId={trailers[0].key}></VideoPlayer> )
        }
        <div>
            <h2 className="car-card__content-title justify-center mb-4">Categories</h2>
            {
                movie.genres?.map((genre) => 
                    <Category key={genre.id} category={genre.name}></Category>
                )
            }
            
        </div>
        </div>


          <div className='flex-1 flex flex-col gap-2'>
                <div className='mt-3 flex flex-wrap gap-4'>
                {Object.entries(movie).map(([key, value]) => {
                    if (Array.isArray(value)) return null; // Ignore arrays
                    if (typeof value === "object" && value !== null) return null; // Ignore nested objects

                    return (
                        <div key={key} className="flex justify-between gap-5 w-full text-right">
                        <h4 className="text-grey capitalize">{key.split("_").join(" ")}</h4>
                        <p className="text-black-100 font-semibold">{String(value)}</p> {/* Ensure value is a string */}
                        </div>
                    );
                    })}
                </div>
            </div>

        </div>

      </div>

  )
}


export default MovieDetails