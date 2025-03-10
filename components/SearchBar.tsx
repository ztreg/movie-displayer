"use client";

import { useState, useEffect, JSX, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ImageComponent } from ".";
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");  // Track the input query
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");  // Track the debounced query
  const [results, setResults] = useState<Movie[]>([]); // Store the fetched movie results
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Show loading state while fetching data
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL ?? "";  // Base URL for the movie poster images
  const router = useRouter();
  const pathname = usePathname();  // Use pathname to detect route changes
  
  // Ref to handle click outside the search bar
  const searchBarRef = useRef<HTMLInputElement>(null);

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
      try {
        const response = await fetch(`/api/movies?query=${debouncedQuery}&page=1`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);  // Trigger the fetch when debouncedQuery changes

  // Close the search when escape key is pressed or when clicking away
  const handleCloseSearch = () => {
    setQuery("");
  };

  // Reset search results and query when the pathname changes
  useEffect(() => {
    setQuery("");
    setResults([]);
  }, [pathname]);

  useEffect(() => {
    // Close the search on Escape key press
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseSearch();
      }
    };

    // Close the search if user clicks outside the search bar
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        handleCloseSearch();
      }
    };

    // Add event listeners for Escape key and clicking outside
    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("mousedown", handleClickOutside);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            className="p-3 hover:bg-gray-800 cursor-pointer flex items-center h-[60px] w-full z-10"
            onClick={() => router.replace(`/movies/${movie.id}`)}
            aria-label={`Go to details for ${movie.title}`}
          >
            {movie.poster_path && (
              <div className="relative w-[50px] h-[50px] my-2 object-contain">
                <ImageComponent
                  baseUrl={imageBaseUrl}
                  imageUrl={movie.poster_path}
                  alt="image of movie poster"
                />
              </div>
            )}
            <p className="flex flex-wrap text-white text-[14px]">{movie.title} - ({movie.release_date?.slice(0, 4) || "?"})</p>
          </button>
        ))}
      </>
    );
  } else {
    dropdownContent = <div className="p-4 text-gray-400">No results found.</div>;
  }

  return (
    <div className="relative w-full flex flex-col min-w-[260px] sm:min-w-[500px]" ref={searchBarRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-3 bg-gray-900 border border-pink-900 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Show dropdown if there are results */}
      {query && (
        <div
          className="absolute top-full left-0 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
