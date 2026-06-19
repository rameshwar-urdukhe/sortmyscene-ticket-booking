import SeatCard from "./SeatCard";

function SeatGrid({ seats, selectedSeats, handleSeatClick }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
      {seats.map((seat) => (
        <SeatCard
          key={seat._id}
          seat={seat}
          selectedSeats={selectedSeats}
          handleSeatClick={handleSeatClick}
        />
      ))}
    </div>
  );
}

export default SeatGrid;
