import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

import EventHeader from "../components/EventHeader";
import SeatGrid from "../components/SeatGrid";
import BookingActions from "../components/BookingActions";
import SeatLegend from "../components/SeatLegend";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservationId, setReservationId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEvent(), fetchSeats()]);
      setLoading(false);
    };
    loadData();
  }, [id]);

  

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeats = async () => {
    try {
      const response = await api.get(`/seats/${id}`);
      setSeats(response.data.seats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSeats();

    const interval = setInterval(() => {
      fetchSeats();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [id]);

  const handleSeatClick = (seat) => {
    if (seat.status !== "available") return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const handleReserveSeats = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert(
          "Authentication Required: Please log in to complete your transaction.",
        );
        return;
      }

      const response = await api.post("/reservations", {
        userId,
        eventId: id,
        seatNumbers: selectedSeats,
      });

      setReservationId(response.data.reservationId);
      setSelectedSeats([]);
      fetchSeats();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleBooking = async () => {
    try {
      await api.post("/bookings", { reservationId });
      setReservationId("");
      fetchSeats();
      alert("🎟️ Booking Confirmed! Enjoy your show.");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <svg
          className="animate-spin h-8 w-8 text-rose-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-sm font-medium text-zinc-400 tracking-wider">
          Loading ticketing architecture...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased pb-12">
      {/* Top Utility Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Movies
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Film Layout & Seating Grid */}
        <div className="lg:col-span-2 space-y-8">
          <EventHeader event={event} />

          {/* Seating Canvas Wrapper */}
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl p-6 sm:p-10 flex flex-col items-center shadow-inner">
            {/* The Curved Cinema Screen Component Graphic */}
            <div className="w-4/5 mx-auto mb-16 relative text-center">
              <div className="w-full h-2 bg-gradient-to-r from-rose-500 via-sky-500 to-rose-500 rounded-full opacity-60 blur-[2px] shadow-[0_4px_20px_rgba(244,63,94,0.4)]" />
              <div className="w-full h-8 bg-gradient-to-b from-white/[0.06] to-transparent rounded-b-3xl mt-1 clip-path-screen" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 block mt-3">
                SCREEN THIS WAY
              </span>
            </div>

            <SeatGrid
              seats={seats}
              selectedSeats={selectedSeats}
              handleSeatClick={handleSeatClick}
            />
            <SeatLegend />
          </div>
        </div>

        {/* Right Side: Glass Summary Checkout Station */}
        <div className="sticky top-6">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold tracking-tight text-white border-b border-zinc-800 pb-4">
              Booking Summary
            </h3>

            <div>
              <label className="text-xs font-semibold uppercase text-zinc-500 tracking-wider block mb-2">
                Selected Seats
              </label>
              {selectedSeats.length ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((num) => (
                    <span
                      key={num}
                      className="bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold px-3 py-1.5 rounded-lg animate-scaleIn"
                    >
                      Seat {num}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500 italic">
                  No seats selected yet.
                </p>
              )}
            </div>

            <BookingActions
              selectedSeats={selectedSeats}
              reservationId={reservationId}
              handleReserveSeats={handleReserveSeats}
              handleBooking={handleBooking}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventDetails;
