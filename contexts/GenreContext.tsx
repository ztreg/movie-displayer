"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { MOVIE_GENRES } from "@/constants/constants";

const GenreContext = createContext<{ genres: { id: number; name: string }[] }>({ genres: [] });

export function GenreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (genres.length === 0) {
      const data = MOVIE_GENRES
      if (data) {
        setGenres(data);
      }
    }
  }, [genres.length]);

  const contextValue = useMemo(() => ({ genres }), [genres]); // ✅ Memoized value for performance

  return <GenreContext.Provider value={contextValue}>{children}</GenreContext.Provider>;
}

export function useGenres() {
  return useContext(GenreContext);
}