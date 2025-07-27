"use client";

import { parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export default function ReservationDate({ vDates, vName, vId, mId }) {
  const { selected, setSelected, resetSelection } = useReservation();

  const disabledDates = (Array.isArray(vDates) ? vDates : []).map((item) =>
    parseISO(item.date)
  );

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const bookingData = {
    date: selected,
    vId,
    mId,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-base-200 p-6 sm:p-8 rounded-2xl shadow-md w-full">
      <div className="lg:col-span-2 space-y-4">
        <p className="text-2xl font-semibold">Select a Date:</p>
        <div className="overflow-x-auto">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => setSelected({ selected: date, name: vName })}
            numberOfMonths={window.innerWidth >= 768 ? 2 : 1}
            disabled={[{ before: tomorrow }, ...disabledDates]}
            footer={
              selected ? `Selected: ${selected.toLocaleDateString()}` : ""
            }
            classNames={{
              today: "text-info rounded-full font-bold",
              selected:
                "text-neutral-50 bg-base-300 shadow-lg rounded-full font-bold",
              chevron: "text-accent",
              day: "font-semibold hover:bg-base-300 transition-colors duration-150 rounded-full",
            }}
            className="max-w-full"
          />
        </div>
        {selected && (
          <button
            className="btn btn-warning btn-sm mt-2"
            onClick={resetSelection}
          >
            Unselect Date
          </button>
        )}
      </div>

      <div className="flex flex-col justify-between">
        <form
          action={async (formData) => {
            const result = await createBookingWithData(formData);
            if (!result.success) alert(result.message);
            resetSelection();
          }}
          className="flex flex-col gap-4"
        >
          <label htmlFor="activity" className="text-lg font-medium">
            What are you planning to do?
          </label>
          <textarea
            name="activity"
            id="activity"
            className="textarea textarea-accent bg-base-100 min-h-[120px]"
            placeholder="Write your plan..."
            required
          />
          <div className="flex justify-end mt-4">
            {!selected ? (
              <p className="text-sm text-gray-500 italic">
                Select a date first
              </p>
            ) : (
              <SubmitButton pendingLabel="Reserving">Reserve Now</SubmitButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
