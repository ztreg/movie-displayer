import { MovieDetails } from "@/components";
import { Movie } from "@/types/types";
import { getMovie, getMovieVideos } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function MoviePage(props: Readonly<{ searchParams: any, params: any }>) {
  
  const params = await props.params
  const id = await params.id

  const movie = await getMovie(id) as Movie
  const videos = await getMovieVideos(id)
  console.log(videos);
  
  if (!movie) return notFound();

  return (
    <div className="overflow-hidden mt-12 padding-x padding-y max-width">
      <MovieDetails movie={movie} ></MovieDetails>
    </div>

  );
}