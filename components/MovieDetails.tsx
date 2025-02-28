"use client";

import { MovieDetailsProps } from "@/types/types";
import { Suspense } from "react";
import { VideoPlayer, Category, ImageComponent } from "./";
import { roundedNumber } from "@/utils/utils";
import Loading from "@/app/loading";

const MovieDetails = ({ movie, trailers }: MovieDetailsProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    
  return (
    <div className="movie__details-wrapper h-auto">
      <div className="movie__details-content group text-blue-500">
        <div className="car-card__content">
          <h2 className="text-[22px] leading-[26px] font-bold capitalize">
            {movie.title}
          </h2> 
        </div>
        <div className="relative w-full h-auto my-2 flex flex-row flex-wrap gap-4">
        <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.poster_path}
            w="234"
            h="40"
            alt="image of movie poster"
          ></ImageComponent>

          <Suspense fallback={<Loading />}>
          {
              trailers?.length && ( <VideoPlayer videoId={trailers[0].key}></VideoPlayer> )
          }
          </Suspense>

          <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.backdrop_path}
            w={"410"}
            h={"50"}
            alt="image of movie backdrop"
          ></ImageComponent>

        </div>


          <div className='flex-1 flex flex-col gap-2'>
                <div className='mt-3 flex flex-wrap gap-4'>
                  <div className='flex gap-4 items-center '>
                    Genres: { movie.genres?.map((genre) => <Category key={genre.id} genre={genre}></Category>)}
                  </div>
                  <p className="text-black-1 font-semibold bg-blue-100 p-4 rounded-2xl">{movie.overview}</p> {/* Ensure value is a string */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="bg-blue-100  p-4 text-black-1 flex">
                      <p>wat: wat</p>
                    </div>
                    <div className="bg-blue-100  p-4 text-black-1 flex">
                      <p>wat: wat</p>
                    </div>
                  </div>
                </div>
                <div className='rounded-3xl bg-blue-950 p-4 text-white flex flex-grow flex-col items-center justify-center flex-wrap'>
              <p className="font-semibold">Released: {movie.release_date}</p> 
              <p className="font-semibold">Rating: {roundedNumber(movie.vote_average)} / 10 </p>
              <p className="font-semibold">{movie.vote_average} / 10 </p> {/* Ensure value is a string */}
          </div>
            </div>


        </div>

      </div>

  )
}


export default MovieDetails