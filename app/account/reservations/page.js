import BookingCard from "../../_components/BookingCard";
import { auth } from "../../_lib/auth";
import { getBookingsById } from "../../_lib/data-service";

async function page() {
  const session = await auth();
  const bookings = await getBookingsById(session.user.accountId);
  console.log(bookings);
  return (
    <>
      <h1 className="text-5xl font-semibold">Reservations</h1>
      <div className="bg-base-200 p-10 m-10  h-full rounded-md">
        <ul>
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

export default page;
