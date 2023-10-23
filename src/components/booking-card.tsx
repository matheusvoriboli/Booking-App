import { PiGear, PiMinusCircleBold, PiXBold } from "react-icons/pi";

import { BookingState } from "@/interfaces/BookingState";
import { deleteBooking, updateBooking } from "@/redux/features/booking-slice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const BookingCard = ({
  location,
  initialDate,
  finalDate,
  id,
}: BookingState) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newBookingData, setNewBookingData] = useState<BookingState>({
    id: id,
    location: location,
    finalDate: finalDate,
    initialDate: initialDate,
  });

  const onClickDeleteBooking = () => {
    dispatch(deleteBooking(id));
  };

  const onClickUpdateBooking = () => {
    dispatch(updateBooking(newBookingData));
    closeModal();
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#booking-app");

  return (
    <>
      <div className="bg-white w-[30%] min-w-[300px] rounded p-4 flex flex-col justify-between">
        <div>
          <div className="flex">
            <h1 className="text-xl">{location}</h1>
          </div>
          <div className="flex">
            <h1>
              <b>Start:</b> {initialDate}
            </h1>
          </div>
          <div className="flex">
            <h1>
              <b>End:</b> {finalDate}
            </h1>
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          <button
            onClick={openModal}
            className="flex p-2 text-white bg-primary rounded items-center gap-1"
          >
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
      {/* Edit booking data modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="font-bold text-lg">Edit your booking</h2>
        <button className="absolute right-2 top-2" onClick={closeModal}>
          <PiXBold />
        </button>
        <div className="flex flex-col w-full mt-3">
          <label className="text-sm" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={newBookingData.location}
            onChange={(e) =>
              setNewBookingData({ ...newBookingData, location: e.target.value })
            }
            className="border border-primary-dark p-2 rounded"
          />
          <label className="text-sm mt-2" htmlFor="initial-date">
            Start
          </label>
          <input
            id="initial-date"
            type="date"
            value={newBookingData.initialDate}
            onChange={(e) =>
              setNewBookingData({ ...newBookingData, initialDate: e.target.value })
            }
            className="border border-primary-dark p-2 rounded"
          />
          <label className="text-sm mt-2" htmlFor="final-date">
            End
          </label>
          <input
            id="final-date"
            type="date"
            value={newBookingData.finalDate}
            onChange={(e) =>
              setNewBookingData({ ...newBookingData, finalDate: e.target.value })
            }
            className="border border-primary-dark p-2 rounded"
          />
          <button onClick={onClickUpdateBooking} className="bg-primary text-white font-semibold rounded p-2 mt-4">Update</button>
        </div>
      </Modal>
    </>
  );
};
