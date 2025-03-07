import { Genre, Movie, MovieCredits, MovieDetailsType, Trailer } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`
  },
  next: { revalidate: 60 } 
};

// ✅ Centralized fetch function for cleaner code & better error handling
async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, optionsGet);

    if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
    const data = await res.json();

    // Handle different response structures
    return data.results ? (data.results as T) : (data as T);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
// ✅ Get movies based on search/category/sort
export async function getMovies(page: number = 1, searchText?: string, category?: string, sort_by = "vote_average.desc") {
  const baseUrl = `${API_URL}/discover/movie`;

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    "vote_count.gte": "1000",
    page: page.toString(),
  });

  if (category) params.append("with_genres", category);
  if (sort_by) params.append("sort_by", sort_by);
  params.append("api_key", ACCESS_TOKEN ?? "");

  // Correct the construction of the URL
  const fullUrl = `${baseUrl}?${params.toString()}`;
  
  return fetchData<Movie[]>(fullUrl);
}

// ✅ Get movie trailers
export async function getMovieVideos(id: string) {
  const url = `${API_URL}/movie/${id}/videos?language=en-US&api_key=${ACCESS_TOKEN}`;
  return fetchData<Trailer[]>(url);
}

// ✅ Get movie credits (cast & crew)
export async function getMovieCredits(movieId: string) {
  const url = `${API_URL}/movie/${movieId}/credits?language=en-US&api_key=${ACCESS_TOKEN}`;
  return fetchData<MovieCredits>(url);
}

// ✅ Get full movie details
export async function getMovie(id: string) {
  const url = `${API_URL}/movie/${id}?language=en-US&api_key=${ACCESS_TOKEN}`;
  return fetchData<MovieDetailsType>(url);
}

// ✅ Get movie genres
export async function getMovieGenres() {
  const url = `${API_URL}/genre/movie/list?language=en-US&api_key=${ACCESS_TOKEN}`;
  return fetchData<Genre[]>(url);
}

// ✅ Get popular movies
export async function getPopularMovies() {
  const url = `${API_URL}/movie/popular?language=en-US&page=1&api_key=${ACCESS_TOKEN}`;
  return fetchData<Movie[]>(url);
}

// ✅ Get popular movies
export async function getUpcomingMovies() {
  const url = `${API_URL}/movie/upcoming?language=en-US&page=1&api_key=${ACCESS_TOKEN}`;
  return fetchData<Movie[]>(url);
}

// 🔢 Utility Functions
export const roundedNumber = (num: number) => Math.round(num * 10) / 10;

export const formatNumber = (num: number) => {
  if(num === 0) return "Missing information"
  return num >= 1_000_000 ? (num / 1_000_000).toFixed(2).replace(".", ",") + " million" : num;
}


export const getPopularityRank = (popularity: number): string => {
  if (popularity >= 300) return "Very High (9-10/10)";
  if (popularity >= 100) return "High (7-8/10)";
  if (popularity >= 30) return "Moderate (4-6/10)";
  if (popularity >= 10) return "Low (2-3/10)";
  return "Very Low (1/10)";
};

export const getYearFromDate = (date: string): string => {
  const parsedDate = new Date(date);
  return parsedDate.getFullYear().toString();
}
