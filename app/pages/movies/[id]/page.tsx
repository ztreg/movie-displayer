import { getMovie } from "@/utils/utils";
import { notFound } from "next/navigation";

export default async function MoviePage({ params }: Readonly<{ params: { id: string } }>) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return (
    <div>
      <h2 className="text-xl font-semibold">{movie.title}</h2>
      <p className="mt-2">{movie.overview}</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Back to list
      </a>
    </div>
  );
}