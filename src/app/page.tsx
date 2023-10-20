"use client";
import { BookingCard } from "@/components/booking-card";
import { IBooking } from "@/interfaces/BookingCard";
import { useState } from "react";

export default function Home() {
  // const [location, setLocation] = useState<string>();
  // const [initialDate, setInitialDate] = useState<Date | null>();
  // const [finalDate, setFinalDate] = useState<Date | null>();
  const [bookingData, setBookingData] = useState<IBooking>({
    location: "",
    finalDate: "",
    initialDate: "",
  });
  const [bookingsArray, setBookingsArray] = useState<IBooking[]>([]);

  const addBooking = () => {
    let newBooking: IBooking = {
      location: bookingData.location,
      initialDate: bookingData.initialDate,
      finalDate: bookingData.finalDate,
    };
    setBookingsArray([...bookingsArray, newBooking]);
    setBookingData({
      location: "",
      finalDate: "",
      initialDate: "",
    });
  };

  const isButtonEnabled = (): boolean => {
    return bookingData.finalDate.length > 0 && bookingData.initialDate.length > 0 && bookingData.location.length > 0;
  }

  return (
    <div className="p-4">
      <h1 className="font-semibold text-3xl">Create a new booking here</h1>
      <div className="flex gap-4 mt-4">
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
          onClick={() => addBooking()}
          className="bg-secondary text-white p-2 rounded-md disabled:opacity-40"
          disabled={!isButtonEnabled()}
        >
          Book
        </button>
      </div>
      <hr className="my-6" />
      <h1 className="text-2xl">Those are your bookings</h1>
      <div className="flex flex-wrap gap-3 mt-4">
        {bookingsArray?.map((booking: IBooking, index: number) => (
          <BookingCard
            location={booking.location}
            initialDate={booking.initialDate}
            finalDate={booking.finalDate}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
