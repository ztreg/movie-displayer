
import { MovieProps } from "@/types/types";
import Link from "next/link";
import { roundedNumber } from "@/utils/utils";
import { ImageComponent } from "./index";

const MovieCard = ({ movie }: MovieProps) => {

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  // console.log(movie);
  
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="car-card group text-blue-500 scale-100 hover:scale-105 ease-in duration-100">
        <div className="car-card__content">
          <h2 className="car-card__content-title w-full text-center">
            {movie.title}
          </h2> 
        </div>
        <div className="relative w-full h-80 my-2 object-contain">
          <ImageComponent
            baseUrl={imageBaseUrl}
            imageUrl={movie.poster_path}
            alt="image of movie poster"
          ></ImageComponent>
        </div>

        <div className="relative flex w-full mt-2 z-50  group-hover:visible">
            <div className="flex flex-col justify-center gap-2 w-full items-center text-start">
              <p className="text-[14px]">📅 {movie.release_date.split("-")[0]}</p>
              <p className="text-[14px]">⭐ {roundedNumber(movie.vote_average)} / 10 </p>
            </div>

        </div>

      </div>
    </Link>
  );
};

export default MovieCard;
