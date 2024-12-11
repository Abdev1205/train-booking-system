import { FaCheckCircle } from "react-icons/fa"; // Importing icons
import { BiReset } from "react-icons/bi";

const Navbar = ({
  handleBookSeats,
  handleResetSeats,
  selectedSeats,
}: {
  handleBookSeats: () => void;
  handleResetSeats: () => void;
  selectedSeats: Number[];
}) => {
  return (
    <div className="sticky top-0 w-full h-[4rem] flex  items-center justify-between z-[50] px-[3rem]  ">
      <div className=" pr-[1rem] flex items-center px-[.5rem] gap-[.4rem] py-[.3rem] rounded-full font-[700] bg-white text-blue-800 font-openSans">
        <img
          src="https://i.pinimg.com/originals/1b/d4/fb/1bd4fba9fcb7949c2de8ad604b8414a4.png"
          alt=""
          className=" w-[2.3rem] "
        />
        Booking
      </div>
      <div className="flex gap-4 absolute right-[1rem]">
        <button
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleBookSeats}
          disabled={selectedSeats.length === 0}
        >
          <FaCheckCircle className="w-5 h-5 text-white" /> {/* Check icon */}
          <span>Book Seats</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-red-500 rounded-full shadow-lg hover:bg-red-600"
          onClick={handleResetSeats}
        >
          <BiReset className="text-white text-[1.2rem] " /> {/* Reset icon */}
          <span>Reset All Seats</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
