
import { MovieProps } from "@/types/types";
import Link from "next/link";
import { ImageComponent } from "./index";
import { getYearFromDate, roundedNumber } from "@/utils/utils";

const MovieCard = ({ movie, type }: MovieProps) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL ?? ""; 
  const imageHeight = type === "explore" ? "h-40" : "h-80"
  return (
    <Link href={`/movies/${movie.id}` } className="min-w-[240px] flex flex-col flex-start scale-100 hover:scale-105 ease-in duration-100 bg-gray-900 text-white p-6 rounded-xl border border-pink-500/60 shadow-lg shadow-pink-500/20">
        <div className="movie-card__content ">
          <h2 className="movie-card__content-title w-full text-center mb-2 h-[40px]">
            {movie.title}
          </h2> 
        </div>
        <div className={`relative w-full ${imageHeight} my-2 object-contain hover_line-animation`}>
          <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.poster_path}
            alt="image of movie poster"
          ></ImageComponent>
        </div>
      {
        type !== "explore" ? (
          <div className="mt-4 flex justify-around flex-wrap items-center">
            <div className="flex flex-col">
              <span className="text-md text-gray-400">⭐ {roundedNumber(movie.vote_average)}/10</span>
              <span className="text-md text-gray-400">Votes: {movie.vote_count}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-md text-gray-400">{getYearFromDate(movie.release_date)}</span>
              <span className="text-md text-gray-100">More ➡️</span>
            </div>
          </div>
          ) : ("")
      }
    </Link>
  );
};

export default MovieCard;
