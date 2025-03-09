import { getMovies } from "@/utils/utils";

import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/types";
import { Sorting } from "@/components";

export default async function MoviePage(
  props: Readonly<{
    searchParams: Promise<{
      page: Promise<string>;
      category: Promise<string>;
      sort_by: Promise<string>;
    }>;
  }>
) {
  // const props = props
  const searchParams = await props?.searchParams;
  const page = Number(await searchParams.page) || 1;
  const category = await searchParams.category;
  const sort = await searchParams.sort_by;

  const movies = await getMovies(page, category, sort);
  const isDataEmpty = !Array.isArray(movies) || movies.length < 1 || !movies;

  return (
    page && (
      <div className="overflow-hidden padding-x padding-y max-width">
        <Sorting></Sorting>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper mt-0 pt-0">
              {movies?.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-white text-xl font-bold">Oops, no results</h2>
          </div>
        )}

        <div className="mt-6 flex justify-center items-center gap-6">
          {page > 1 ? (
            <Link
              href={`/movies?page=${page - 1}${
                category && "&category=" + category
              }`}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-700 text-gray-400 rounded-md cursor-not-allowed">
              ← Previous
            </span>
          )}

          <span className="text-gray-300 font-semibold">Page {page}</span>

          <Link
            href={`/movies?page=${page + 1}${
              category && "&category=" + category
            }`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
          >
            Next →
          </Link>
        </div>
      </div>
    )
  );
}
