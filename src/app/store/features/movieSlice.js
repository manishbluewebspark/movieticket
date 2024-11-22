import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch movies in a city
export const fetchMoviesInCity = createAsyncThunk(
  "movies/fetchMoviesInCity",
  async (cityid) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/moviesInCity`, {
        cityid,
      });
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch movies");
    }
  }
);

// Fetch filtered movies
export const fetchFilteredMovies = createAsyncThunk(
  "movies/fetchFilteredMovies", // Unique type prefix
  async (filters) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/movieFilters`, {
        ...filters,
      });
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch filtered movies");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    showtimes: [], // Add showtimes and showdates to state if required
    showdates: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchMoviesInCity actions
    builder
      .addCase(fetchMoviesInCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesInCity.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload; // Update movies
      })
      .addCase(fetchMoviesInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle fetchFilteredMovies actions
    builder
      .addCase(fetchFilteredMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Strictly update only the `movies.movies` array, leave other state properties intact
        state.movies = {
          ...state.movies, // Keep the existing state properties intact
          movies: action.payload.movies, // Update only the `movies.movies` array
        };
        // Note: If the API response includes showtimes and showdates, you can choose to update them as needed.
        // For now, we're not modifying them so they remain unchanged.
      })
      .addCase(fetchFilteredMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
