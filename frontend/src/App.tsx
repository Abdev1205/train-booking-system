import { useState, useEffect } from "react";
import { API_BASE_URL } from "./lib/utils";
import axios from "axios";
import { useToast } from "./hooks/use-toast";
import { Seat } from "types.ts";
import TrainSeat from "./components/custom/TrainSeat";
import TrainSeatSkeleton from "./components/custom/TrainSeatSkeleton";
import Navbar from "./components/custom/common/Navbar";
import { ConfettiSideCannons } from "./components/custom/animation/ConfettiSideCannons";

const TrainCoach = () => {
  const [seatData, setSeatData] = useState<Seat[] | []>([]);
  const [selectedSeats, setSelectedSeats] = useState<Number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { handleClick } = ConfettiSideCannons();

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seats`);
      setSeatData(response.data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch seat data.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const handleSeatClick = (seatNumber: number): void => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBookSeats = async () => {
    if (selectedSeats.length === 0) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/book`, {
        selectedSeats,
      });

      toast({
        title: "Seats Booked",
        description: response.data.message,
        variant: "success",
      });
      handleClick();

      fetchSeats();
      setSelectedSeats([]);
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.response?.data?.error || "Failed to book seats.",
        variant: "destructive",
      });
    }
  };

  const handleResetSeats = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset`);
      toast({
        title: "Reset Successful",
        description: response.data.message,
        variant: "default",
      });
      fetchSeats();
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset seats.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center main-page ">
      <Navbar
        handleBookSeats={handleBookSeats}
        handleResetSeats={handleResetSeats}
        selectedSeats={selectedSeats}
      />
      <div className=" z-[10] py-[3rem] bg-white card-bg  rounded-[1.5rem] px-[3rem] border-blue-800  border-2 ">
        {isLoading ? (
          <TrainSeatSkeleton />
        ) : (
          <div className="flex gap-[.2rem] flex-wrap w-[20rem] z-[10] ">
            <TrainSeat
              handleSeatClick={handleSeatClick}
              seatData={seatData}
              selectedSeats={selectedSeats}
            />
          </div>
        )}
      </div>
      <div className=" w-[100%] h-[100vh] absolute z-[1] ">
        <img
          src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202308/ezgif-sixteen_nine_91.jpg?size=948:533"
          alt=""
          className="object-cover w-full h-full pointer-events-none "
        />
      </div>
    </div>
  );
};

export default TrainCoach;
