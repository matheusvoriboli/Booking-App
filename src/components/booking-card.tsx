import { PiGear, PiMinusCircleBold } from "react-icons/pi";

import { BookingState } from "@/interfaces/BookingState";
import { deleteBooking } from "@/redux/features/booking-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export const BookingCard = ({
  location,
  initialDate,
  finalDate,
  id,
}: BookingState) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickDeleteBooking = () => {
    dispatch(deleteBooking(id));
  };

  return (
    <div className="bg-white w-[30%] min-w-[300px] rounded p-4 flex flex-col justify-between">
      <div>
        <div className="flex">
          <h1 className="text-xl">{location}</h1>
        </div>
        <div className="flex">
          <h1><b>Start:</b> {initialDate}</h1>
        </div>
        <div className="flex">
          <h1><b>End:</b> {finalDate}</h1>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <button className="flex p-2 text-white bg-primary rounded items-center gap-1">
          <PiGear />
          Edit
        </button>
        <button
          onClick={onClickDeleteBooking}
          className="flex p-2 text-white bg-red-400 rounded items-center gap-1"
        >
          <PiMinusCircleBold />
          Delete
        </button>
      </div>
    </div>
  );
};
