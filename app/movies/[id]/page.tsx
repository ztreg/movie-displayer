import { MovieDetails } from "@/components";
// import { MovieDetailsType } from "@/types/types";
import { getMovie, getMovieVideos } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function MoviePage(
  props: Readonly<{
    searchParams: Promise<{ [key: string]: string }>; // Now searchParams is a Promise
    params: Promise<{ id: Promise<string> }>; // params is already a Promise
  }>
){
  try {
    console.log("MoviePage props:", props); // ✅ Log props to debug

    const params = await props.params.catch((err) => {
      console.error("Error fetching id:", err);
      return null;
    });
    console.log("Fetching movie with ID:", params);
    if (!params) {
      console.log("id not found, triggering notFound()");
      return notFound();
    }
    const id = await params.id

    if (!id) {
      console.log("id not found, triggering notFound()");
      return notFound();
    }

    const movie = await getMovie(id).catch((err) => {
      console.error("Error fetching movie:", err);
      return notFound();
    });

    if (!movie) {
      console.log("Movie not found, triggering notFound()");
      return notFound();
    }

    const videos = await getMovieVideos(id).catch((err) => {
      console.error("Error fetching videos:", err);
      return notFound();
    });

    const filteredVideos = videos?.filter((video) => video.type === "Trailer");

    return (
      <div className="overflow-hidden mt-12 padding-x padding-y max-width">
        <MovieDetails movie={movie} trailers={filteredVideos} />
      </div>
    );
  } catch (error) {
    console.error("MoviePage error:", error);
    return notFound(); // Ensure it fails gracefully
  }
}