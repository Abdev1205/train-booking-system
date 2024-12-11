import { SeatImage } from "@/assets/assetsManager";
import { cn } from "@/lib/utils";

import { Seat } from "types";

const TrainSeat = ({
  seatData,
  selectedSeats,
  handleSeatClick,
}: {
  seatData: Seat[];
  selectedSeats: Number[];
  handleSeatClick: (seatNumber: number) => void;
}) => {
  return seatData.map((seat, index) => (
    <div
      key={seat.number}
      className={cn(
        "relative flex mb-[.3rem] flex-col items-center justify-center cursor-pointer",
        {
          "seat-booked opacity-50 cursor-not-allowed": seat.isBooked,
          "seat-select": selectedSeats.includes(seat.number),
          "shadow-gray-200/50":
            !seat.isBooked && !selectedSeats.includes(seat.number),
        },
        (index + 1) % 7 === 4 ? "mr-8" : "" // Adds pathway gap after 3 seats
      )}
      onClick={() => !seat.isBooked && handleSeatClick(seat.number)}
    >
      <img
        src={SeatImage}
        alt="Seat"
        className={cn("size-[2.3rem]", {
          "opacity-50": seat.isBooked,
          "opacity-100": !seat.isBooked,
        })}
      />
      <span className="absolute bg-black size-[1rem] flex items-center justify-center text-[.6rem] rounded-full text-center font-semibold text-white">
        {seat.number}
      </span>
    </div>
  ));
};

export default TrainSeat;
