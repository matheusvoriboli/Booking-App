import { BookingState } from "@/interfaces/BookingState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: BookingState[];
};

const initialState = {
  value: [] as BookingState[],
} as InitialState;

const areDatesCollapsing = (
  incomingInitialDate: Date,
  incomingFinalDate: Date,
  state: InitialState,
  incomingId?: number // Just send when i'm updating the booking
): boolean => {
  for (const existingBooking of state.value) {
    var currentInitialDate = new Date(existingBooking.initialDate);
    var currentFinalDate = new Date(existingBooking.finalDate);
    if (
      (incomingInitialDate >= currentInitialDate &&
        incomingInitialDate < currentFinalDate) ||
      (incomingFinalDate > currentInitialDate &&
        incomingFinalDate <= currentFinalDate) ||
      (incomingInitialDate <= currentInitialDate &&
        incomingFinalDate >= currentFinalDate)
    ) {
      if (existingBooking.id !== incomingId) {
        /* 
         Incoming id is the id of the booking that i'm trying to UPDATE.
         I don't need to check if i'm overlapping the date from a booking that i'm trying to update. 
         I can update just the location for example, and in that case the date is going to be the same and 
         there's no problem cause i'm not overlapping any booking, just updating the current one
         */
        return true;
      }
    }
  }
  return false;
};

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
          if (
            !areDatesCollapsing(incomingInitialDate, incomingFinalDate, state)
          ) {
            state.value.push(action.payload);
          } else {
            console.error(
              "You cannot book on this date. Check your bookings to find a better date"
            );
          }
        }
      }
    },
    deleteBooking: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((obj) => obj.id !== action.payload);
    },
    updateBooking: (state, action: PayloadAction<BookingState>) => {
      var incomingInitialDate = new Date(action.payload.initialDate);
      var incomingFinalDate = new Date(action.payload.finalDate);
      var incomingId = action.payload.id;
      if (incomingInitialDate > incomingFinalDate) {
        console.error("Initial Date cannot be bigger than the final date");
      } else {
        if (state.value.length == 0) {
          state.value.push(action.payload);
        } else {
          if (
            !areDatesCollapsing(
              incomingInitialDate,
              incomingFinalDate,
              state,
              incomingId
            )
          ) {
            state.value.forEach((obj) => {
              if (obj.id === action.payload.id) {
                obj.location = action.payload.location;
                obj.initialDate = action.payload.initialDate;
                obj.finalDate = action.payload.finalDate;
              }
            });
          } else {
            console.error(
              "You cannot book on this date. Check your bookings to find a better date"
            );
          }
        }
      }
    },
  },
});

export const { addBooking, deleteBooking, updateBooking } = booking.actions;
export default booking.reducer;
