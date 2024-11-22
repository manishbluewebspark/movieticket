import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchCities = createAsyncThunk("city/fetchCities", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch cities");
  }
});

const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
    selectedCity: "", // Added selectedCity field
    loading: false,
    error: null,
  },
  reducers: {
    // Action to set the selected city
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity } = citySlice.actions; // Export the action

export default citySlice.reducer;
