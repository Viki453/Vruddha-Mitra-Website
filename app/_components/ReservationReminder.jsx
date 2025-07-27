"use client";
import { HiXMark } from "react-icons/hi2";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { selected, name, resetSelection } = useReservation();
  if (!selected) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative bg-base-300 shadow-xl rounded-xl p-4 border border-base-content/10 max-w-xs w-full">
        <button
          onClick={resetSelection}
          className="absolute top-2 right-2 text-base-content/50 hover:text-base-content transition-colors"
          aria-label="Dismiss reminder"
        >
          <HiXMark className="w-5 h-5" />
        </button>

        <p className="text-sm text-base-content font-medium pr-6">
          📅 You've reserved time with{" "}
          <strong className="font-extrabold">{name}</strong> on{" "}
          <strong className="font-extrabold">{selected?.toDateString()}</strong>
          .
        </p>
        <p className="text-xs text-base-content/70 mt-1">
          We'll make sure you don't forget 😊
        </p>
      </div>
    </div>
  );
}

export default ReservationReminder;
