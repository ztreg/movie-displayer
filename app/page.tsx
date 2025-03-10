import { getPopularMovies, getUpcomingMovies } from "@/utils/utils";
import { Explore } from "@/components";

export default async function Home() {
  const popularRes = await getPopularMovies();
  const movies = popularRes?.results ?? []
  const upcomingRes = await getUpcomingMovies();
  const upcomingMovies = upcomingRes?.results ?? []

  // Check if data is empty
  const isDataEmpty = !Array.isArray(movies) || movies.length < 1;
  const isUpcomingEmpty = !Array.isArray(upcomingMovies) || upcomingMovies.length < 1;

  return (
    <div className="overflow-hidden padding-x padding-y">
      {/* Trending Movies Section */}
      {!isDataEmpty ? (
        <section>
          <Explore movies={movies} text="Trending Movies" />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-white text-xl font-bold">Oops, no results</h2>
        </div>
      )}

      {/* Upcoming Movies Section */}
      {!isUpcomingEmpty ? (
        <section>
          <Explore movies={upcomingMovies} text="Upcoming Releases" />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-white text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </div>
  );
}
