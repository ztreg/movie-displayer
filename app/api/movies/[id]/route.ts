import { NextResponse, NextRequest } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { movieId, rating } = await request.json();
    // Validate input
    if (!movieId || !rating || rating < 1 || rating > 10) {
      return NextResponse.json(
        { error: "Invalid movieId or rating. Rating must be between 1 and 10." },
        { status: 400 }
      );
    }

    const optionsPost = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: rating }),
    };
    
    const response = await fetch(`${API_URL}/movie/${movieId}/rating`, optionsPost);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.status_message || "Failed to post rating" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ message: "Rating posted successfully", result });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
