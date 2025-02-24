import Image from "next/image";
import { getMovies } from "@/utils/utils";

import Link from "next/link";
import { MovieCard } from "@/components";
import { Movie } from "@/types/types";

export default async function Home(props: Readonly<{ searchParams: any }>) {
  const searchParams = await props?.searchParams
  const page = await searchParams.page || 1

  const movies = await getMovies(page);
  return (
    page && 
    <div className="overflow-hidden mt-12 padding-x padding-y max-width">
      <h2 className="text-xl font-semibold mb-4">Movies</h2>
      <div className="home__cars-wrapper">
        {movies?.length > 0 && movies.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
      </div>

      <div className="mt-4 flex gap-4">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} className="text-blue-500 hover:underline">
            ← Previous
          </Link>
        )}
        <Link href={`/?page=${page + 1}`} className="text-blue-500 hover:underline">
          Next →
        </Link>
      </div>
    </div>
  );
}
