"use client";

import { MovieDetailsProps } from "@/types/types";
import { Suspense, useState } from "react";
import { VideoIframe, Category, ImageComponent, Credit } from "./";
import Loading from "@/app/loading";
import { formatNumber, getPopularityRank, getYearFromDate, roundedNumber } from "@/utils/utils";
import RatingModal from "./RatingModal";

const MovieDetails = ({ movie, trailers, credits }: MovieDetailsProps) => {

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const isCrewsEmpty = !Array.isArray(credits?.crew) || credits.crew.length < 1 || !credits;
  const isCastEmpty = !Array.isArray(credits?.cast) || credits.cast.length < 1 || !credits;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Rate this movie");

  const handleStarClick = () => {
    setIsModalOpen(true);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = async () => {
    if (selectedRating) {
      if (selectedRating === null) return;
      setStatusMessage("Rating...")
      await fetch(`/api/movies/${movie.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: selectedRating, movieId: movie.id }),
      });

      setStatusMessage("Successfully rated ✅")
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="movie__details-wrapper h-auto ">
      <div className="p-6 mt-2 min-h-screen bg-gradient-to-r from-gray-800 via-purple-950 to-gray-900 text-white rounded-3xl">
        <div className="">
          <div className="flex justify-between flex-wrap px-3">
            <div className="text-[26px] leading-[40px] font-bold capitalize">
              {movie.title}
            </div>
            <div className="flex flex-col mr-6">
              <p className="text-[20px] leading-[20px] font-semibold">
                <button 
                onClick={handleStarClick}
                className={`text-xl font-semibold ${statusMessage !== "Successfully rated ✅" ? 'animate-blink' : ''}`}
                >{statusMessage === "Successfully rated ✅" ? '✨' : '⭐'}</button>
                {movie.vote_average ? roundedNumber(movie.vote_average) : "?"}/10
              </p>
              <p className="text-[14px]">Votes: {movie.vote_count}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-400 px-3">
            <div>{getYearFromDate(movie.release_date)}</div>
            <div>{movie.adult ? "R" : "PG-13"}</div>
            <div>{movie.runtime} min</div>
          </div>
        </div>
        <div className="relative w-full h-auto my-2 flex flex-row flex-wrap gap-6 bg-black/40 backdrop-blur-lg py-4 rounded-3xl justify-around items-center">
          <div className="relative h-[300px] w-[243px] object-contain rounded-3xl">
            <ImageComponent baseUrl={imageBaseUrl} imageUrl={movie.poster_path} alt="image of movie poster"></ImageComponent>
          </div>

          <Suspense fallback={<Loading />}>
            {trailers && trailers?.length > 0 && <VideoIframe videoId={trailers?.[0]?.key} title={trailers?.[0].name}></VideoIframe>}
          </Suspense>

          <div className="relative h-[300px] w-[400px] object-contain rounded-3xl m-0 p-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2x">
            <Suspense fallback={<Loading />}>
              <ImageComponent baseUrl={imageBaseUrl} imageUrl={movie.backdrop_path} alt="image of movie backdrop"></ImageComponent>
            </Suspense>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mt-3 flex flex-wrap gap-8">
            <div className="flex gap-4 items-center justify-between flex-wrap w-full">
              <blockquote className="border-l-4 border-purple-600 pl-4 italic text-white text-lg">
                “{movie?.tagline || "Life is like a box of chocolate, something something...."}”
              </blockquote>
              <div className="flex gap-2 mr-6 flex-wrap">
                {movie.genres?.map((genre) => (
                  <Category key={genre.id} genre={genre}></Category>
                ))}
              </div>
            </div>
            <div className="flex flex-1 justify-between flex-wrap gap-4 items-center">
              <div className="max-w-[800px]">
                <p className="text-gray-300 leading-relaxed text-base">{movie.overview || "Life is like a box of chocolate, something something...."}</p>
              </div>
              <div className="flex flex-col gap-1 mr-6">
                <p className="text-gray-200 text-m">Full Release Date: {movie.release_date}</p>
                <p className="text-gray-200 text-m">Budget: {formatNumber(movie.budget)}</p>
                <p className="text-gray-200 text-m">Revenue: {formatNumber(movie.revenue)}</p>
                <p className="text-gray-200 text-m">Popularity: {getPopularityRank(movie.popularity)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full border-t-2">
              {/* Top Actors Section */}
              <div className="p-4 text-black-1 flex flex-col border-r-2">
                {!isCastEmpty ? (
                  <div className="p-4 text-black-1 flex flex-col gap-4">
                    <h2 className="pb-2 text-lg">Top Actors</h2>
                    {credits?.cast?.map((cast, i) => i < 5 && <Credit key={`${cast.id}-${i}`} credit={cast} />)}
                  </div>
                ) : (
                  <div className="home__error-container">
                    <h2 className="text-white text-xl font-bold">Oops, no results</h2>
                  </div>
                )}
              </div>

              {/* Key Crew Members Section */}
              <div className="p-4 text-black-1 flex flex-col">
                {!isCrewsEmpty ? (
                  <div className="p-4 text-black-1 flex flex-col gap-4">
                    <h2 className="pb-2 text-lg">Key Crew Members</h2>
                    {credits?.crew?.map((crew, i) => i < 5 && <Credit key={`${crew.id}-${i}`} credit={crew} />)}
                  </div>
                ) : (
                  <div className="home__error-container">
                    <h2 className="text-white text-xl font-bold">Oops, no results</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isModalOpen={isModalOpen}
        selectedRating={selectedRating}
        handleRatingChange={handleRatingChange}
        handleSubmitRating={handleSubmitRating}
        handleClose={handleCloseModal}
        statusMessage={statusMessage}
      />
    </div>
  );
};

export default MovieDetails;
