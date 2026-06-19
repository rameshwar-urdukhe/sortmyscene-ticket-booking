import { useEffect, useState } from "react";
import api from "../services/api";
import EventList from "../components/EventList";

function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/events");
      setEvents(response.data.events || response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter events dynamically based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased pb-12">
      {/* Premium Global Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            CINE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500">
              PASS
            </span>
          </h1>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search movies or venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl pl-10 pr-4 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all duration-200"
            />
          </div>
        </div>
      </nav>

      {/* Main Main Body Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-zinc-100 sm:text-2xl">
            Now Showing
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Discover and book tickets for the latest exclusive screenings.
          </p>
        </div>

        {/* Dynamic State Layout Controller */}
        {isLoading ? (
          /* Premium Shimmer Layout Skeleton Loader */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-[2/3] w-full bg-zinc-800 rounded-xl" />
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
                <div className="h-10 bg-zinc-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          /* Empty Search Fallback State Graphic */
          <div className="flex flex-col items-center justify-center text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl p-8">
            <svg
              className="w-12 h-12 text-zinc-600 mb-4"
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
            <h3 className="text-lg font-medium text-zinc-300">
              No screenings discovered
            </h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-xs">
              We couldn't find matches matching "{searchQuery}". Try updating
              your spelling or check back later.
            </p>
          </div>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </main>
    </div>
  );
}

export default Events;
