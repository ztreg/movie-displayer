"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ImageComponent } from ".";
import debounce from "lodash/debounce";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL ?? "";

  const debouncedFetch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery) {
          setResults([]);
          return;
        }

        try {
          setIsLoading(true);
          const response = await fetch(
            `/api/movies?query=${searchQuery}&page=1`
          );
          if (response.ok) {
            setResults(await response.json());
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    []
  );

  // Update search results on query change
  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  // Close search when route changes
  useEffect(() => {
    setQuery("");
    setResults([]);
  }, [pathname]);

  // Close search bar when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        setQuery("");
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuery("");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("keydown", handleEscape);
      }
    };
  }, []);

  // Render dropdown content
  let dropdownContent;
  if (isLoading) {
    dropdownContent = <div className="p-4 text-gray-400">Loading...</div>;
  } else if (results.length === 0) {
    dropdownContent = <div className="p-4 text-gray-400">No results found.</div>;
  } else {
    dropdownContent = results.map((movie) => (
      <button
        key={movie.id}
        className="p-3 hover:bg-gray-800 flex items-center h-[60px] w-full"
        onClick={() => router.replace(`/movies/${movie.id}`)}
      >
        {
          <div className="relative w-[50px] h-[50px] my-2 object-contain">
            <ImageComponent baseUrl={imageBaseUrl} imageUrl={movie.poster_path ?? ""} alt="Movie poster" />
          </div>
        }
        <p className="text-white text-sm">{movie.title} ({movie.release_date?.slice(0, 4) ?? "?"})</p>
      </button>
    ));
  }

  return (
    <div className="relative flex flex-col min-w-[260px] sm:min-w-[500px]" ref={searchBarRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-3 bg-gray-900 border border-pink-900 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Dropdown results */}
      {query && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
