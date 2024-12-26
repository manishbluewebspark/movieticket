// app/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import citySlice from "./features/citySlice";
import movieSlice from "./features/movieSlice";
import cinemaBookingSlice from "./features/cinemaBookingSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    city: citySlice,
    movies: movieSlice,
    cinemaBooking: cinemaBookingSlice,
  },
});
