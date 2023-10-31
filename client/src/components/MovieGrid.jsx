import MovieCard from './MovieCard';

const MovieGrid = (params) => {
  const movies = params.movies;

  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
      {movies && movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id}/>
      ))}
    </div>
  );
}

export default MovieGrid;