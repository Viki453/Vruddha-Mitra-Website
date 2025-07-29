import BookingCard from "../../_components/BookingCard";
import { auth } from "../../_lib/auth";
import { getBookingsById } from "../../_lib/data-service";

export default async function Page() {
  const session = await auth();
  const bookings = await getBookingsById(session.user.accountId);

  return (
    <>
      <h1 className="text-3xl sm:text-5xl font-semibold px-4 pt-4">
        Reservations
      </h1>
      <div className="bg-base-200 rounded-md m-4 sm:m-10 p-4 sm:p-10">
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard bookingData={booking} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
