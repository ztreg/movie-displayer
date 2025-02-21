const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const SEARCH_URL = "search/movie?query="

export async function getMovies(page: number = 1) {
    const fullUrl = `${API_URL}/movie/550`
    console.log(fullUrl);

    try {
        const res = await fetch(`${fullUrl}`, {
            headers: {
              "Authorization": `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            }
          });
        //   console.log(res)
        //   if (!res.ok) throw new Error("Failed to fetch movies");
        
          const data = await res.json();
        //   console.log(data);
          
          return data.results; // Returns an array of 20 movies
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



