"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getMovieGenres } from "@/utils/utils"; // Import the function

const GenreContext = createContext<{ genres: { id: number; name: string }[] }>({ genres: [] });

export function GenreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      if (genres?.length === 0) {
          const data = await getMovieGenres();
          if (data) {
            setGenres(data);
          }
      }
    }

    if (genres.length === 0) {
      fetchGenres();
    }
  }, [genres.length]);

  const contextValue = useMemo(() => ({ genres }), [genres]); // ✅ Memoized value for performance

  return <GenreContext.Provider value={contextValue}>{children}</GenreContext.Provider>;
}

export function useGenres() {
  return useContext(GenreContext);
}