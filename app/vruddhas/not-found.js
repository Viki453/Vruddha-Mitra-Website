import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 text-center">
      <h1 className="text-5xl font-bold text-error">404 - Page Not Found</h1>
      <p className="text-lg mt-4 text-base-content">
        The profile you’re looking for doesn’t exist.
      </p>
      <Link href="/vruddhas" className="btn btn-primary mt-6">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
