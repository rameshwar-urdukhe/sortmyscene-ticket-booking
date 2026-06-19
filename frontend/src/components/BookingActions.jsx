function BookingActions({
  selectedSeats,
  reservationId,
  handleReserveSeats,
  handleBooking,
}) {
  // If no reservation exists, run Step 1 (Hold Reservation)
  if (!reservationId) {
    return (
      <button
        onClick={handleReserveSeats}
        disabled={selectedSeats.length === 0}
        className="w-full bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 disabled:border-zinc-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg active:scale-[0.99] transition-all duration-200 text-sm tracking-wide border border-transparent"
      >
        {selectedSeats.length > 0
          ? `Lock In ${selectedSeats.length} Selected Seats`
          : "Select Seats to Continue"}
      </button>
    );
  }

  // If reservation is generated in the backend, trigger Step 2 (Final Checkout purchase confirmation)
  return (
    <div className="space-y-3 animate-fadeIn">
      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
        <p className="text-xs text-emerald-400 font-medium font-mono">
          ✓ Reservation Locked ({reservationId.substring(0, 8)}...)
        </p>
      </div>
      <button
        onClick={handleBooking}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-xl shadow-emerald-950/20 active:scale-[0.99] transition-all duration-200 text-sm tracking-wide"
      >
        Confirm Tickets & Purchase
      </button>
    </div>
  );
}

export default BookingActions;
