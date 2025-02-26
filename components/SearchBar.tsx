"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ()  => {
    const router = useRouter();
    const searchParams = useSearchParams();
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
    const updateQueryParams = (newQuery: string) => {
      const params = new URLSearchParams(searchParams);
      if (newQuery) {
        params.set("query", newQuery);
      } else {
        params.delete("query");
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    };

    if (debouncedQuery !== initialQuery) {
      updateQueryParams(debouncedQuery);
    }
  }, [debouncedQuery, initialQuery, router, searchParams]);


  return (
    <div className="relative w-[400px] max-w-lg">
      {/* Search Bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;
