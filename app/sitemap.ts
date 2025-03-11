import { Movie } from "@/types/types";
import { getMovies } from "@/utils/utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const moviesResponse = await getMovies();
  const movies = moviesResponse?.results ?? [];

  const staticRoutes = [
    { url: "https://ztregmdb.vercel.app/", priority: 1, changefreq: "daily" },
    { url: "https://ztregmdb.vercel.app/movies", priority: 0.8, changefreq: "weekly" },
  ];

  const dynamicMovieRoutes = movies.map((movie: Movie) => ({
    url: `https://ztregmdb.vercel.app/movies/${movie.id}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicMovieRoutes];
}
