import Image from "next/image";
import { getMovies } from "@/utils/utils";

import Link from "next/link";

export default async function Home(props: Readonly<{ searchParams: { page?: any } }>) {
  // // const searchParams = await props.searchParams;
  const { page } = await props.searchParams || 1
  // // const page = Number(searchParams?.page) || 1;
  // const page = 1
  const movies = await getMovies(1);
  return (
    <div className="overflow-hidden mt-12 padding-x padding-y max-width">
      <h2 className="text-xl font-semibold mb-4">Movies</h2>
      <ul>
        {movies?.length > 0 && movies.map((movie: { id: number; title: string }) => (
          <li key={movie.id} className="mb-2">
            <Link href={`/movies/${movie.id}`} className="text-blue-500 hover:underline">
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} className="text-blue-500 hover:underline">
            ← Previous
          </Link>
        )}
        <Link href={`/?page=${page + 1}`} className="text-blue-500 hover:underline">
          Next →
        </Link>
      </div>
    </div>
  );
}
