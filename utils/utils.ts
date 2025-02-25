import { Movie } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TOKEN = `api_key=${ACCESS_TOKEN}`
const SEARCH_URL = "search/movie?query="

export async function getMovies(page: number = 1, searchText?: string) {
    const generalSorting = `include_adult=false&language=en-US&sort_by=title.asc&vote_count.gte=10000`
    let fullUrl = ""
    if (searchText) {
     fullUrl = `${API_URL}/search/movie?query=${encodeURIComponent(searchText)}&${generalSorting}&page=${page}&${TOKEN}`
    } else {
      fullUrl = `${API_URL}/discover/movie?${generalSorting}&page=${page}&${TOKEN}`

    }
    
    try {
        const res = await fetch(`${fullUrl}`);
        if (!res.ok) throw new Error("Failed to fetch movies");        
        const data = await res.json();
        const movieResults: Movie[] = data.results
        return movieResults; // Returns an array of 20 movies
    } catch (error) {
        console.log(error);
        return []
    }
    
  }

  export async function getMovie(id: string) {
    const res = await fetch(`${API_URL}/movie/${id}?language=en-US`, {
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  
    if (!res.ok) return null;
  
    return res.json();
  }



