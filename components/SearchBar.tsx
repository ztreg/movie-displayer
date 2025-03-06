"use client";

import { useState, useEffect, JSX } from "react";
import { getMovies } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { ImageComponent } from ".";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]); // Store fetched movies
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const imageBaseUrl = "https://image.tmdb.org/t/p/w185";
  // Debounce the query input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch movies when the debounced query changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    const fetchMovies = async () => {
      setIsLoading(true);
      const response = await getMovies(1, debouncedQuery)
      setResults(response);
      setIsLoading(false);
    };

    fetchMovies();
  }, [debouncedQuery]);

  // Determine what to display in the dropdown
  let dropdownContent: JSX.Element;

  if (isLoading) {
    dropdownContent = <div className="p-4 text-gray-400">Loading...</div>;
  } else if (results.length > 0) {
    dropdownContent = (
      <>
        {results.map((movie) => (
          <button
            key={movie.id}
            className="p-3 hover:bg-gray-800 cursor-pointer flex items-center h-[60px] w-full z-10 "
            onClick={() => router.replace(`/movies/${movie.id}`)}
          >
            {movie.poster_path && (
              <div className="relative w-[50px] h-[50px] my-2 object-contain">
                <ImageComponent
                  baseUrl={imageBaseUrl}
                  imageUrl={movie.poster_path}
                  alt="image of movie poster"
                ></ImageComponent>
              </div>
            )}
              <p className="flex flex-wrap text-white text-[14px]">{movie.title} -  ({movie.release_date?.slice(0, 4) || "?"})</p>
          </button>
        ))}
      </>
    );
  } else {
    dropdownContent = <div className="p-4 text-gray-400">No results found.</div>;
  }

  return (
    <div className="relative w-[390px] max-w-lg flex flex-col">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-3 bg-gray-900 border border-pink-900 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Show dropdown if there are results */}
      {query && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

// Wrapping the SearchBar with Suspense
export default SearchBar