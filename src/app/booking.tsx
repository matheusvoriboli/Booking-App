import { BookingState } from "@/interfaces/BookingState";
import { addBooking } from "@/redux/features/booking-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BookingCard } from "../components/booking-card";

export function Booking() {
  const [bookingData, setBookingData] = useState<BookingState>({
    id: 0,
    location: "",
    finalDate: "",
    initialDate: "",
  });
  const [bookingsArray, setBookingsArray] = useState<BookingState[]>([]);
  const bookings = useAppSelector((state) => state.bookingReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const bookingIsBeingAdded = () => {
   var newId = 0;
   if(bookings.length !== 0) {
      newId = bookings[bookings.length - 1].id + 1;
   }
    let newBooking = {
      id: newId,
      location: bookingData.location,
      initialDate: bookingData.initialDate,
      finalDate: bookingData.finalDate,
    };
    setBookingsArray([...bookingsArray, newBooking]);
    setBookingData({
      id: 0,
      location: "",
      finalDate: "",
      initialDate: "",
    });
    dispatch(addBooking(newBooking));
  };

  const isButtonEnabled = (): boolean => {
    return (
      bookingData.finalDate.length > 0 &&
      bookingData.initialDate.length > 0 &&
      bookingData.location.length > 0
    );
  };

  return (
    <div>
      <h1 className="font-semibold text-3xl">Create a new booking here</h1>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <input
          type="text"
          className="p-3 rounded-md"
          placeholder="Location"
          value={bookingData.location}
          onChange={(e) =>
            setBookingData({ ...bookingData, location: e.target.value })
          }
        />
        <input
          className="p-3 rounded-md"
          type="date"
          value={bookingData.initialDate}
          onChange={(e) =>
            setBookingData({ ...bookingData, initialDate: e.target.value })
          }
        />
        <input
          className="p-3 rounded-md"
          type="date"
          value={bookingData.finalDate}
          onChange={(e) =>
            setBookingData({ ...bookingData, finalDate: e.target.value })
          }
        />
        <button
          onClick={() => bookingIsBeingAdded()}
          className="bg-secondary text-white p-2 rounded-md disabled:opacity-40"
          disabled={!isButtonEnabled()}
        >
          Book
        </button>
      </div>
      <hr className="my-6" />
      {bookings.length ? (
        <>
      <h1 className="text-2xl">Those are your bookings</h1>
      <div className="flex flex-wrap gap-3 mt-4">
        {bookings?.map((booking, index: number) => (
          <BookingCard
          location={booking.location}
          initialDate={booking.initialDate}
          finalDate={booking.finalDate}
          id={booking.id}
          key={booking.id}
          />
          ))}
      </div>
          </>
      ) : (
        <h1 className="text-2xl">You have no bookings yet</h1>
      )}
    </div>
  );
}
