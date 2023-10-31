const SearchList = ({ results }) => {
  const POSTER_BASE = 'https://image.tmdb.org/t/p/w200/';

  return (
    <ul className='absolute z-1 overflow-y-auto top-12 bg-white w-1/4'>
      {results && results.map((movie) => (
          <li key={movie.id} className='p-1 bg-white hover:bg-slate-200'>
            <div className='flex flex-grow p-1'>
              <img src={POSTER_BASE + movie.poster_path} alt={movie.title} className='w-[50px] h-auto p-1'/>
              <p className='content-center'>{movie.title}</p>
            </div>
          </li>
      ))}
    </ul>
  )
}
export default SearchList;