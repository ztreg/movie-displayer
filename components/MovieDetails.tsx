"use client";

import { MovieDetailsProps } from "@/types/types";
import { Suspense } from "react";
import { VideoPlayer, Category, ImageComponent } from "./";
import { formatNumber, getPopularityRank, roundedNumber } from "@/utils/utils";
import Loading from "@/app/loading";

const MovieDetails = ({ movie, trailers }: MovieDetailsProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    
  return (
    <div className="movie__details-wrapper h-auto ">
      <div className="p-6 mt-2 min-h-screen bg-gradient-to-r from-gray-800 via-purple-950 to-gray-900 text-white rounded-3xl">
        <div className="">
          <h2 className="text-[26px] leading-[40px] font-bold capitalize">
            {movie.title}
          </h2> 
        </div>
        <div className="relative w-full h-auto my-2 flex flex-row flex-wrap gap-6 bg-black/40 backdrop-blur-lg py-4 rounded-3xl">
          <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.poster_path}
            w="234"
            h="40"
            alt="image of movie poster"
          ></ImageComponent>

          <Suspense fallback={<Loading />}> { trailers?.length && ( <VideoPlayer videoId={trailers[0].key}></VideoPlayer> ) } </Suspense>

          <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.backdrop_path}
            w={"410"}
            h={"50"}
            alt="image of movie backdrop"
          ></ImageComponent>
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='mt-3 flex flex-wrap gap-8'>
            <div className='flex gap-4 items-center justify-between flex-wrap w-full'>
              <blockquote className="border-l-4 border-purple-600 pl-4 italic text-white text-lg">
                “{movie.tagline}”
              </blockquote>
              <div className="flex gap-2 mr-6">
                { movie.genres?.map((genre) => <Category key={genre.id} genre={genre}></Category>)}
              </div>
            </div>
            <div className=''>
              <p className='p-4 text-gray-300 leading-relaxed'>{movie.overview}</p>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full border-t-2">
              <div className="p-4 text-black-1 flex flex-wrap flex-col">
                <p className="text-gray-400 text-md">Released: {movie.release_date}</p> 
                <p className="text-gray-400 text-m">Audience Score: {roundedNumber(movie.vote_average)} / 10 </p>
                <p className="text-gray-400 text-m">Number of votes: {movie.vote_count} </p> 
                <p className="text-gray-400 text-m">Budget: ${formatNumber(movie.budget)}</p> 
                <p className="text-gray-400 text-m">Revenue: ${formatNumber(movie.revenue)}</p> 
                <p className="text-gray-400 text-m">Made in: {movie.origin_country}</p> 
                <p className="text-gray-400 text-m">Popularity: {getPopularityRank(movie.popularity)}</p> 
              </div>
              <div className="p-4 text-black-1 flex flex-wrap flex-col">
                <p className="text-gray-400 text-lg">Released: {movie.release_date}</p> 
                <p className='text-gray-400 text-m'>Audience Score: {roundedNumber(movie.vote_average)} / 10 </p>
                <p className="text-gray-400 text-m">Number of votes: {movie.vote_count} </p> 
                <p className="text-gray-400 text-m">Budget: ${movie.budget}</p> 
                <p className="text-gray-400 text-m">Made in: {movie.origin_country}</p> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default MovieDetails