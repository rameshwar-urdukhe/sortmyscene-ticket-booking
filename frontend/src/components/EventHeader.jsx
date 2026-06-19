function EventHeader({ event }) {
  if (!event) return null;

  // Format the date for a cleaner look
  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Coming Soon";

  return (
    <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/40 border border-zinc-800/80 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
      {/* Left Section: Poster + Movie Details */}
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full md:w-auto">
        {/* Movie Poster Box */}
        <div className="w-24 h-36 sm:w-28 sm:h-40 bg-zinc-950 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 flex-shrink-0 relative group">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            /* Premium Fallback Abstract Icon if no image exists */
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-2 text-center">
              <svg
                className="w-6 h-6 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 4v16M17 4v16M3 8h18M3 16h18"
                />
              </svg>
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider mt-1 font-semibold">
                No Poster
              </span>
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide">
            {eventDate}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
            {event.title}
          </h1>

          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            {event.description ||
              "Experience this exclusive cinematic masterpiece live on the big screen."}
          </p>
        </div>
      </div>

      {/* Right Section: Location Badge */}
      <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-2xl text-xs font-medium text-zinc-300 shadow-md w-full md:w-auto justify-center md:justify-start">
        <svg
          className="w-4 h-4 text-rose-500 flex-shrink-0"
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
        <span className="truncate">{event.venue || "Cinema Auditorium"}</span>
      </div>
    </div>
  );
}

export default EventHeader;
