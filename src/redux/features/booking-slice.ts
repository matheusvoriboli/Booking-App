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
      state.value.push(action.payload);
   },
   deleteBooking: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(obj => obj.id !== action.payload)
   },
  }
});

export const { addBooking, deleteBooking } = booking.actions;
export default booking.reducer;