import { Movie, MovieDetailsType, Trailer } from "@/types/types";

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

  export async function getMovieVideos(id: string): Promise<Trailer[]> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTcxOGE5YWU4ZmU1MzAyNTY3YTA2Nzc5MmQwZGY0YiIsIm5iZiI6MTc0MDE0ODA0OS4wMzAwMDAyLCJzdWIiOiI2N2I4OGQ1MTQ0NGRkN2ZjZWZiYTdlYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kRfrjrOLDy2rm4DDipnzhByo-V4CAzfPsNXtgWg8mn0'
      }
    };
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
      
    try {
        const res = await fetch(`${url}`, options);
        if (!res.ok) throw new Error("Failed to fetch movies");        
        const data = await res.json();   
        const movieResults: Trailer[] = data.results
        return movieResults; // Returns an array of 20 movies
    } catch (error) {
        console.log(error);
        return []
    }

    
  }

  

  export async function getMovie(id: string): Promise<MovieDetailsType> {
    try {
      const res = await fetch(`${API_URL}/movie/${id}?language=en-US&${TOKEN}`);
      if (!res.ok) throw new Error("Failed to fetch movies");        
      const data = await res.json();
      const movieResults: MovieDetailsType = data
      return movieResults; // Returns an array of 20 movies
    
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle error gracefully, e.g., log it or return a default movie
        console.error(error.message); // You can log or return a default Movie object
      }
      // If you want to return something specific in case of error, use a fallback movie or an empty object
      return {} as MovieDetailsType; // Return an empty object or a default movie
    }
    
  }

export const roundedNumber = (decimalNumber: number) => Math.round(decimalNumber * 10) / 10

