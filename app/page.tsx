import {  getPopularMovies, getUpcomingMovies } from "@/utils/utils";

import { Explore } from "@/components";

export default async function Home( props: Readonly<{ searchParams: Promise<{ page: Promise<string>, query: Promise<string>, category: Promise<string> }>}>) {
 // const props = props
  const searchParams = await props?.searchParams
  const page = Number(await searchParams.page) || 1

  const movies = await getPopularMovies();
  const upcomingMovies = await getUpcomingMovies();
  const isDataEmpty = !Array.isArray(movies) || movies.length < 1 || !movies
  const isUpcomingEmpty = !Array.isArray(upcomingMovies) || upcomingMovies.length < 1 || !upcomingMovies

  return (
    page && 
      <div className="overflow-hidden padding-x padding-y">
        {!isDataEmpty ? (
            <section>
              <Explore movies={movies}  text="Trending Movies"></Explore>
            </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-white text-xl font-bold">Oops, no results</h2>
          </div>
        )}
        {!isUpcomingEmpty ? (
            <section>
              <Explore movies={upcomingMovies} text="Upcoming Releases" ></Explore>
            </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-white text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
  );
}
