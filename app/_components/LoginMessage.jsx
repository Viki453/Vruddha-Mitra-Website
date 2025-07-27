import Link from "next/link";

function LoginMessage({ vName }) {
  return (
    <div className="bg-base-300 p-8 sm:p-10 rounded-xl shadow-lg max-w-md mx-auto text-center flex flex-col gap-6">
      <p className="text-base text-base-content">
        Please <strong className=" font-semibold">Login</strong> to book your
        reservation with <strong className=" font-semibold">{vName}</strong>{" "}
        today itself!
      </p>

      <Link
        href="/login"
        className="bg-success text-success-content px-5 py-2 rounded-lg text-sm font-medium transition hover:bg-success/90"
      >
        Log In
      </Link>
    </div>
  );
}

export default LoginMessage;
