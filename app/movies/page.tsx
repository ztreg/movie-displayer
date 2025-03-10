import { getMovies } from "@/utils/utils"; // Assuming you have this utility function
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/types";
import { Sorting } from "@/components";
import { notFound } from "next/navigation"; // For handling 404-like errors

interface MoviePageProps {
  searchParams: Promise<{
    page: string;
    category: string;
    sort_by: string;
  }>;
}

export default async function MoviePage({ searchParams }: Readonly<MoviePageProps>) {
  // Await the searchParams properties since they are promises
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category || "";
  const sort_by = params.sort_by || "popularity.desc";

  // Fetching movie data using a utility function, replace with your actual fetching logic
  const moviesResponse = await getMovies(page, category, sort_by);
  const movies = moviesResponse?.results ?? [];
  const totalPages = moviesResponse?.total_pages ?? 0;
  const totalResults = moviesResponse?.total_results?? 0;
  const isDataEmpty = !Array.isArray(movies) || movies.length < 1;

  if (isDataEmpty) {
    notFound(); // Optional: this will display a 404 page if no data is found
  }

  return (
    <div className="overflow-hidden padding-x padding-y max-width">
      <Sorting />
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

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-6 font-semibold text-lg">
        {page > 1 ? (
          <Link
            href={`/movies?page=${page - 1}${category ? "&category=" + category : ""}`}
            className="px-5 py-2 bg-[#2D2A32] text-[#E8C872] border border-[#E8C872] rounded-lg 
                      hover:bg-[#3B373F] transition-all duration-200 shadow-md"
          >
            ← Previous
          </Link>
        ) : (
          <span className="px-5 py-2 bg-[#1E1B22] text-gray-500 border border-gray-700 rounded-lg cursor-not-allowed">
            ← Previous
          </span>
        )}

        <span className="text-base tracking-widest flex flex-col">
            {page} / {totalPages} ({totalResults})
        </span>

        {page + 1 <= totalPages ? (
          <Link
            href={`/movies?page=${page + 1}${category ? "&category=" + category : ""}`}
            className="px-5 py-2 bg-[#2D2A32] text-[#E8C872] border border-[#E8C872] rounded-lg 
                      hover:bg-[#3B373F] transition-all duration-200 shadow-md"
          >
            Next →
          </Link>
        ) : (
          <span className="px-5 py-2 bg-[#1E1B22] text-gray-500 border border-gray-700 rounded-lg cursor-not-allowed">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}
