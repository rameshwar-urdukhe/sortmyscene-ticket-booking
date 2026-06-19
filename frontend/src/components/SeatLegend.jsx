function SeatLegend() {
  const legendItems = [
    { label: "Available", dotClass: "bg-zinc-800 border-zinc-700" },
    {
      label: "Selected",
      dotClass:
        "bg-sky-500 border-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.4)]",
    },
    { label: "Reserved", dotClass: "bg-amber-500/20 border-amber-500/30" },
    { label: "Booked", dotClass: "bg-zinc-900 border-zinc-950" },
  ];

  return (
    <div className="mt-12 pt-6 border-t border-zinc-900 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-md border ${item.dotClass}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default SeatLegend;
