import { MovieDetails } from "@/components";
import { MovieDetailsType } from "@/types/types";
import { getMovie, getMovieVideos } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function MoviePage(props: Readonly<{ searchParams: any, params: any }>) {
  
  const params = await props.params
  const id = await params.id

  const movie = await getMovie(id) as MovieDetailsType
  const videos = await getMovieVideos(id)
  const filteredVideos = videos?.filter(video => video.type === "Trailer")

  
  if (!movie) return notFound();

  return (
    <div className="overflow-hidden mt-12 padding-x padding-y max-width">
      <MovieDetails movie={movie} trailers={filteredVideos} ></MovieDetails>
    </div>

  );
}