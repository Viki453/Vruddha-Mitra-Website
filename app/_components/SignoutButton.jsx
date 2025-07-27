"use client";

import { signOutAction } from "../_lib/actions";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";

function SignoutButton() {
  return (
    <form action={signOutAction} className="w-full">
      <button
        type="submit"
        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-base-content hover:bg-base-100 hover:text-accent bg-base-300"
      >
        <span className="text-xl">
          <HiArrowLeftEndOnRectangle />
        </span>
        <span className="text-base">Sign out</span>
      </button>
    </form>
  );
}

export default SignoutButton;
