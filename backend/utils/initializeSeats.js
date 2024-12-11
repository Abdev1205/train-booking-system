import Seat from "../models/seat.js";

const initializeSeats = async () => {
  const seatCount = await Seat.countDocuments();
  if (seatCount === 0) {
    const seats = Array.from({ length: 80 }, (_, index) => ({ number: index + 1 }));
    await Seat.insertMany(seats);
    console.log("Seats initialized.");
  }
};

export default initializeSeats