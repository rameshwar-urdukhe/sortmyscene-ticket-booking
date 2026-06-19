function SeatCard({ seat, selectedSeats, handleSeatClick }) {
  const isSelected = selectedSeats.includes(seat.seatNumber);

  // Clean conditional style management
  let stateStyles = "";
  if (isSelected) {
    stateStyles =
      "bg-sky-500 text-white border-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.4)] cursor-pointer scale-95";
  } else if (seat.status === "available") {
    stateStyles =
      "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-400 cursor-pointer";
  } else if (seat.status === "reserved") {
    stateStyles =
      "bg-amber-500/10 border-amber-500/20 text-amber-500/60 cursor-not-allowed opacity-60";
  } else {
    // Booked / Taken
    stateStyles =
      "bg-zinc-900 border-zinc-900 text-zinc-700 cursor-not-allowed";
  }

  return (
    <button
      onClick={() => handleSeatClick(seat)}
      disabled={seat.status !== "available"}
      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-mono text-xs font-bold flex items-center justify-center border transition-all duration-200 select-none ${stateStyles}`}
    >
      {seat.seatNumber}
    </button>
  );
}

export default SeatCard;
