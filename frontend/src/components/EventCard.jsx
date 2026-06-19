import { Link } from "react-router-dom";

function EventCard({ event }) {
  // Graceful date transformation layout
  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date Coming Soon";

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-black/40 flex flex-col transform hover:-translate-y-1 transition-all duration-300">
      {/* Event Graphic Art/Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Premium fallback generative abstract artwork asset for blank fields */
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.07)_0,transparent_65%)]" />
            <svg
              className="w-10 h-10 text-zinc-700 mb-2 group-hover:text-rose-500/40 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 block">
              Cinematic Pass
            </span>
          </div>
        )}

        {/* Absolute Date Badge floating layout */}
        <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider text-rose-400 shadow-md">
          {eventDate}
        </div>
      </div>

      {/* Metadata Detail Layer Box */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-rose-400 transition-colors duration-200">
          {event.title}
        </h3>

        {/* Venue Row */}
        <div className="flex items-center gap-2 text-zinc-400 text-sm mt-2 mb-5">
          <svg
            className="w-4 h-4 text-zinc-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">{event.venue || "TBD Theater"}</span>
        </div>

        {/* CTA Direct Routing Action Button */}
        <div className="mt-auto">
          <Link
            to={`/events/${event._id}`}
            className="block w-full text-center bg-zinc-800 hover:bg-gradient-to-r hover:from-rose-600 hover:to-red-500 text-zinc-200 hover:text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-all duration-200 border border-zinc-700/50 hover:border-transparent"
          >
            Select Seats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
