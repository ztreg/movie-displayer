import { MovieDetails } from "@/components";
import { getMovie, getMovieCredits, getMovieVideos } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage(
  props: Readonly<{
    searchParams: Promise<{ [key: string]: string }>;
    params: Promise<{ id: Promise<string> }>;
  }>
) {
  try {
    const params = await props.params;
    const id = await params.id;

    const movie = await getMovie(id);
    if (!movie) {
      return notFound();
    }

    const videos = await getMovieVideos(id);
    const credits = await getMovieCredits(id);
    const filteredVideos = videos?.filter((video) => video.type === "Trailer") ?? [];

    return (
      <div className="overflow-hidden padding-x padding-y max-width">
        <MovieDetails movie={movie} trailers={filteredVideos} credits={credits} />
      </div>
    );
  } catch {
    return notFound();
  }
}
