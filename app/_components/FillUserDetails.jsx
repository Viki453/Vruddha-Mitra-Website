import Link from "next/link";

function FillUserDetails() {
  return (
    <div className="bg-base-300 p-8 sm:p-10 rounded-xl shadow-lg max-w-md mx-auto text-center flex flex-col gap-6">
      <p className="text-base text-base-content">
        Fill in you personal details so that we can proceed with reserving you
        booking.
      </p>

      <Link
        href="/account/profile"
        className="bg-success text-success-content px-5 py-2 rounded-lg text-sm font-medium transition hover:bg-success/90"
      >
        Fill details
      </Link>
    </div>
  );
}

export default FillUserDetails;
