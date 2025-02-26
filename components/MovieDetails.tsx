"use client";

import Image from "next/image";
import { MovieProps } from "@/types/types";
import { useState } from "react";

const MovieDetails = ({ movie }: MovieProps) => {
    const [imageError, setImageError] = useState(false);
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    

  return (
    <div className="movie__details-wrapper">
      <div className="movie__details-content group text-blue-500">
        <div className="car-card__content">
          <h2 className="car-card__content-title justify-center">
            {movie.title}
          </h2> 
        </div>
        <div className="relative w-full h-80 my-2 object-contain">
          <Image
            src={ !imageError && movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : "/no-image.svg" }
            alt="image of movie"
            sizes="10"
            fill
            priority
            className="object-contain"
            onError={() => setImageError(true)} // If error, show fallback
          />
        </div>

        <Video></Video>

        <div className="relative flex w-full mt-2 z-50  group-hover:visible">
          <div className="flex w-full justify-between ">
            <div className="flex flex-col justify-start gap-2">
              <p className="text-[14px]">Release date: {movie.release_date}</p>
              <p className="text-[14px]">Rating {movie.vote_average} / 10</p>
              <p className="text-[14px]">
                Number of ratings: {movie.vote_count}
              </p>
            </div>
          </div>

        </div>

      </div>
      </div>
  )
}

function Video() {
    return (
      <video width="320" height="240" controls preload="none">
        <source src="/path/to/video.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    )
  }

export default MovieDetails