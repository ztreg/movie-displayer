import { getMovies } from "@/utils/utils";

import Link from "next/link";
import MovieCard  from "@/components/MovieCard";
import { Movie } from "@/types/types";

export default async function Home( props: Readonly<{ searchParams: Promise<{ page: Promise<string>, query: Promise<string> }>}>) {
  const searchParams = await props?.searchParams
  const page = Number(await searchParams.page) || 1
  const searchText = await searchParams.query
  
  const movies = await getMovies(page, searchText);
  const isDataEmpty = !Array.isArray(movies) || movies.length < 1 || !movies

  return (
    page && 
    <div className='overflow-hidden mt-12 padding-x padding-y max-width'>
      {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper mt-4">
              {movies?.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
                )
              )}
            </div>
          </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            </div>
          )}

      <div className="mt-4 flex gap-4">
        {page > 1 && (
          <Link href={`/?page=${(page-1)}`} className="text-blue-500 hover:underline">
            ← Previous
          </Link>
        )}
        <Link href={`/?page=${(page+1)}`} className="text-blue-500 hover:underline">
          Next →
        </Link>
      </div>
    </div>
  );
}
