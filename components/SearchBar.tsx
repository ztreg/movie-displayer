"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ()  => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    const initialQuery = searchParams.get("query") ?? ""; // Get query from URL if available
    const [query, setQuery] = useState(initialQuery);

    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce logic: wait 300ms after the user stops typing before updating the query params
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (window.location.pathname !== "/") return; // Prevent running on other pages
  
    const updateQueryParams = (newQuery: string) => {
      const params = new URLSearchParams(searchParams);
      if (newQuery) {
        params.set("query", newQuery);
      } else {
        params.delete("query");
      }
      router.replace(`/?${params.toString()}`, { scroll: false });
    };
  
    if (debouncedQuery !== initialQuery) {
      updateQueryParams(debouncedQuery);
    }
  }, [debouncedQuery, initialQuery, router, searchParams]);

   // Clear input when navigating away (when query param is removed)
   useEffect(() => {
    if (!searchParams.has("query")) {
      setQuery("");
    }
  }, [searchParams]);

  return (
    <div className="relative w-[390px] max-w-lg flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-300 dark:text-white dark:placeholder:text-gray-100 dark:focus:ring-pink-300"
      />
    </div>
  );
}

// Wrapping the SearchBar with Suspense
export default function SuspendedSearchBar() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchBar />
    </Suspense>
  )
}