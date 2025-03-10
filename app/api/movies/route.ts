import { NextResponse, NextRequest } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
  next: { revalidate: 60 } 
};

// Used for server side fetching directly into component (Search bar)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");  
  const page = url.searchParams.get("page") ?? "1";

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  const fullUrl = `${API_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${ACCESS_TOKEN}&language=en-US`
  try {
    // Fetch movies from TMDB
    const res = await fetch(fullUrl , optionsGet);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data.results);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
