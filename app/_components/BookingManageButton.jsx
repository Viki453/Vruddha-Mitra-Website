"use client";
import { useTransition } from "react";
import { deleteBooking } from "../_lib/actions";

function BookingManageButton({ id }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete your visit?"))
      startTransition(() => deleteBooking(id));
  }
  return (
    <div className="flex flex-col gap-2">
      <button
        className="text-sm px-3 py-1 btn btn-error"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default BookingManageButton;
