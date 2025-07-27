"use client";

function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-red-800">
      <div className="text-center p-6 bg-base-300 rounded-lg shadow-md border border-red-300 max-w-md">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

export default Error;
