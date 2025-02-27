import { MovieDetails } from "@/components";
import { getMovie, getMovieVideos } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function MoviePage(
  props: Readonly<{
    searchParams: Promise<{ [key: string]: string }>; // Now searchParams is a Promise
    params: Promise<{ id: Promise<string> }>; // params is already a Promise
  }>
){
  try {
    const params = await props.params
    const id = await params.id

    const movie = await getMovie(id)
    console.log(movie);
    
    if (!movie) {
      console.log("Movie not found, triggering notFound()");
      return notFound();
    }

    const videos = await getMovieVideos(id)
    const filteredVideos = videos?.filter((video) => video.type === "Trailer") ?? [];

    return (
      <div className="overflow-hidden mt-12 padding-x padding-y max-width">
        <MovieDetails movie={movie} trailers={filteredVideos} />
      </div>
    );
  } catch {
    return notFound();
  }
}