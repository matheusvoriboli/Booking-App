import { PiMinusCircleBold } from "react-icons/pi";

import { IBooking } from "@/interfaces/BookingCard";

// export const BookingCard = () => {
//   return (
//     <div className="w-1/3 h-60 rounded bg-white relative">
//       <div className="absolute top-1 left-1 bg-gray-300 opacity-70 py-[2px] px-2 rounded-md">
//          <span className="text-xs text-primary-dark font-semibold flex items-center gap-1">
//             <PiMapPin className="text-primary-dark"/>
//             United States, Florida
//          </span>
//       </div>
//       <div className="h-1/2 w-full overflow-hidden rounded">
//         <img className="w-full object-cover" src="./house-1.jpg" alt="" />
//       </div>
//       <div className="flex flex-col justify-between p-3">
//         <div className="flex justify-between">
//           <div className="max-w-[35%] overflow-on-second-line overflow-hidden whitespace-nowrap text-ellipsis">
//             <h3 className="font-semibold">South Florida Beach House</h3>
//           </div>
//           <div>
//             <span className="text-sm text-secondary whitespace-nowrap">R$ 200/day</span>
//           </div>
//         </div>
//         <span className="text-sm brightness-75">9563 Cross Street Orange Park, FL 32073</span>
//       </div>
//     </div>
//   );
// };

export const BookingCard = ({location, initialDate, finalDate}: IBooking) => {
  return (
    <div className="bg-white w-1/3 h-36 rounded p-2 relative">
      <PiMinusCircleBold className="absolute right-1 top-1 h-5 w-5 text-red-400 cursor-pointer" />
      {location}
      <br />
      {initialDate}
      <br />
      {finalDate}
    </div>
  )
}