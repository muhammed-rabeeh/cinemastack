import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { moviesActions } from '../features/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch('http://localhost:4500/api/movies/trending');
      const json = await res.json();
      
      if (res.ok) {
        dispatch(moviesActions.set(json));
      }
    }

    getMovies();
  }, []);
  
  return (
    <MovieGrid movies = {movies}/>
  )
}

export default Home;