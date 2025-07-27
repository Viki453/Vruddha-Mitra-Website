import Link from "next/link";

function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-base-300 shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-green-600 mb-2">
          Thank you for booking your visit
        </h1>
        <p className="text-gray-600 mb-6">
          One small effort, a very big effect
        </p>
        <Link
          href="/account/reservations"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Go to your reservations
        </Link>
      </div>
    </div>
  );
}

export default Page;
