import { PiMinusCircleBold } from "react-icons/pi";

import { BookingState } from "@/interfaces/BookingState";
import { deleteBooking } from "@/redux/features/booking-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export const BookingCard = ({location, initialDate, finalDate, id}: BookingState) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const onClickDeleteBooking = () => {
    dispatch(deleteBooking(id))
  }

  return (
    <div onClick={onClickDeleteBooking} className="bg-white w-1/3 h-36 rounded p-2 relative">
      <PiMinusCircleBold className="absolute right-1 top-1 h-5 w-5 text-red-400 cursor-pointer" />
      {location}
      <br />
      {initialDate}
      <br />
      {finalDate}
    </div>
  )
}