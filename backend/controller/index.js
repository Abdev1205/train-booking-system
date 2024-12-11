import Seat from "../models/seat.js";

const getSeat = async (req, res) => {
  try {
    const seats = await Seat.find();
    return res.json(seats);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch seats." });
  }
}

const bookSeat = async (req, res) => {
  const { selectedSeats } = req.body; // Array of selected seat numbers

  if (!Array.isArray(selectedSeats) || selectedSeats.length < 1) {
    return res.status(400).json({ error: "Selected seats must be an array with at least one seat." });
  }

  // Validating that all selected seat numbers are valid and available
  try {
    const seats = await Seat.find({ number: { $in: selectedSeats } });

    if (seats.length !== selectedSeats.length) {
      return res.status(400).json({ error: "Some of the selected seats are invalid." });
    }

    // Checking if all selected seats are available
    const unavailableSeats = seats.filter(seat => seat.isBooked);
    if (unavailableSeats.length > 0) {
      const unavailableSeatNumbers = unavailableSeats.map(seat => seat.number);
      return res.status(400).json({
        error: `The following seats are already booked: ${unavailableSeatNumbers.join(", ")}`
      });
    }

    // Updating the isBooked status for the selected seats
    await Seat.updateMany({ number: { $in: selectedSeats } }, { $set: { isBooked: true } });

    return res.json({ message: "Seats booked successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to book seats." });
  }
}

const resetSeats = async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false });
    return res.json({ message: "All seats have been reset." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to reset seats." });
  }
}

export {
  getSeat,
  bookSeat,
  resetSeats
}