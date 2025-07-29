"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-success w-full md:w-auto self-end"
      type="submit"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
