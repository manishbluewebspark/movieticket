import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Book tickets
export const bookTickets = createAsyncThunk(
  "cinemaBooking/bookTickets",
  async (bookingDetails) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ticketsForMovie`, {
        ...bookingDetails,
      });
      return response.data;
    } catch (error) {
      throw Error("Failed to book tickets");
    }
  }
);

const cinemaBookingSlice = createSlice({
  name: "cinemaBooking",
  initialState: {
    cinemas: [],
    bookingStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingStatus(state) {
      state.bookingStatus = null; // Reset booking status
    },
  },
  extraReducers: (builder) => {
    // Handle bookTickets actions
    builder
      .addCase(bookTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingStatus = action.payload; // Update booking status
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearBookingStatus } = cinemaBookingSlice.actions;

export default cinemaBookingSlice.reducer;
