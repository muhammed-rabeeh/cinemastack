import { useDispatch } from 'react-redux';
import { moviesActions } from '../features/moviesSlice';
import { useState } from 'react';
import SearchList from './SearchList';
import useSearch from '../hooks/useSearch';
import SearchIcon from "../assets/search.svg";

const NavBar = () => {
  const dispatch = useDispatch();
  const { query, setQuery, results, loading, error } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(results);
    dispatch(moviesActions.set(results));
  }

  return (
    <header>
      <div className="flex justify-between items-center
      bg-black px-2">
        <span><h1 className="text"><a href="/">cinemaStack</a></h1></span>
        <div className='search '>
          <form onSubmit={handleSubmit} className='flex justify-end'>
            <input
              className="p-1 mx-2 rounded-md text-black w-1/2" 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <SearchList results={[{ title: 'Loading', id: 0 }]} />}
            <SearchList results={results} />
            {error && <SearchList results={[{ title: error.message, id: 0 }]} />}
            <img
                src={SearchIcon}
                alt="search"
                onClick={()=>searchMovies(searchTerm)}
            />
          </form>
        </div>
      </div>
    </header>
  )
}

export default NavBar;