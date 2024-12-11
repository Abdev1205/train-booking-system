import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: Number,
  isBooked: { type: Boolean, default: false },
});


const Seat = mongoose.model("User", seatSchema);
export default Seat;
