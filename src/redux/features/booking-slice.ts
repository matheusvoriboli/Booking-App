import { BookingState } from "@/interfaces/BookingState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: BookingState[];
};

const initialState = {
  value: [] as BookingState[],
} as InitialState;

export const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingState>) => {
      var incomingInitialDate = new Date(action.payload.initialDate);
      var incomingFinalDate = new Date(action.payload.finalDate);
      if (incomingInitialDate > incomingFinalDate) {
        console.error("Initial Date cannot be bigger than the final date");
      } else {
        if (state.value.length == 0) {
          state.value.push(action.payload);
        } else {
         var foundDateInterpolation = false;
          for (const existingBooking of state.value) {
             var currentInitialDate = new Date(existingBooking.initialDate);
             var currentFinalDate = new Date(existingBooking.finalDate);
             if (
                 (incomingInitialDate >= currentInitialDate && incomingInitialDate < currentFinalDate) ||
                 (incomingFinalDate > currentInitialDate && incomingFinalDate <= currentFinalDate) ||
                 (incomingInitialDate <= currentInitialDate && incomingFinalDate >= currentFinalDate)
             ) {
                 foundDateInterpolation = true
             }
          }
          if(!foundDateInterpolation) {
            state.value.push(action.payload);
          } else {
            console.error("You cannot book on this date. Check your bookings to find a better date");
          }
        }
      }
    },
    deleteBooking: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((obj) => obj.id !== action.payload);
    },
  },
});

export const { addBooking, deleteBooking } = booking.actions;
export default booking.reducer;
