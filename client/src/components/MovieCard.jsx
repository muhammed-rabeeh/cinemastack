const MovieCard = (params) => {
  const movie = params.movie;
  const POSTER_BASE = 'https://image.tmdb.org/t/p/w400/';

  return (
    <div className='border rounded-lg shadow-md p-4 w-full' key={movie.id}>
      <img src={POSTER_BASE + movie.poster_path} alt={movie.title} className='w-full h-auto'/>
      <h2 className='text-center mt-2'>{movie.title}</h2>
    </div>
  );
}
export default MovieCard;