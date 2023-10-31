import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
  },
  reducers: {
    set: (state, action) => {
      state.movies = action.payload;
    },
  }
})

export const moviesReducer = moviesSlice.reducer;
export const moviesActions = moviesSlice.actions;