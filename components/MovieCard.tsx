
import { MovieProps } from "@/types/types";
import Link from "next/link";
import { ImageComponent } from "./index";
import { roundedNumber } from "@/utils/utils";

const MovieCard = ({ movie, type }: MovieProps) => {

  const imageBaseUrl = "https://image.tmdb.org/t/p/w185";

  return (
    <Link href={`/movies/${movie.id}` } className="min-w-[240px] flex flex-col flex-start scale-100 hover:scale-105 ease-in duration-100 bg-gray-900 text-white p-6 rounded-xl border border-pink-500/60 shadow-lg shadow-pink-500/20">
        <div className="car-card__content ">
          <h2 className="car-card__content-title w-full text-center mb-2">
            {movie.title}
          </h2> 
        </div>
        <div className="relative w-full h-80 my-2 object-contain hover_line-animation">
          <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.poster_path}
            alt="image of movie poster"
          ></ImageComponent>
        </div>
      {
        type !== "explore" ? (
          <div className="mt-4 flex">
            <span className="text-md text-gray-400">⭐ {roundedNumber(movie.vote_average)}/10</span>
            <span className="text-md text-gray-100">⭐ Votes: { movie.vote_count }</span>
            <button className="px-4 py-2 bg-pink-500 text-gray-900 font-semibold rounded-lg hover:bg-pink-400 transition">
              Details
            </button>
          </div>
          ) : (
            ""
          )
      }
    </Link>
  );
};

export default MovieCard;
