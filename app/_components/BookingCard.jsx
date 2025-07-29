import Image from "next/image";
import { getBookingDisplayFormat } from "../_helpers/dateHelpers";
import BookingManageButton from "./BookingManageButton";
import BookingStatusBadge from "./BookingStatusBadge";
import ReviewButton from "./ReviewButton";

function BookingCard({ bookingData }) {
  const {
    id: bookingId,
    created_at: bookedOn,
    date: bookingDate,
    status,
    mReview,
    vruddhas: {
      image: vruddhaImg,
      firstName: vruddhaFirstName,
      lastName: vruddhaLastName,
    },
  } = bookingData;

  const bkDate = getBookingDisplayFormat(bookedOn);
  const vsDate = getBookingDisplayFormat(bookingDate);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-base-100 shadow rounded-lg p-4">
      <div className="w-full sm:w-24 h-48 sm:h-24 rounded overflow-hidden relative">
        <Image
          src={vruddhaImg}
          fill
          alt="Vruddha"
          className="object-cover"
          quality={80}
        />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg font-semibold">
            {vruddhaFirstName} {vruddhaLastName}
          </h2>
          <BookingStatusBadge status={status} />
        </div>

        <p className="text-sm text-gray-600">Booking ID: {bookingId}</p>
        <p className="text-sm text-gray-600">Visit Date: {vsDate}</p>
        <p className="text-sm text-gray-600">Booked On: {bkDate}</p>

        {status === "past" && mReview && (
          <div className="mt-2">
            <span className="font-medium">Your review: </span>
            <span>{mReview}</span>
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-0 flex-shrink-0">
        {status === "past" ? (
          !mReview && <ReviewButton id={bookingId} />
        ) : (
          <BookingManageButton id={bookingId} />
        )}
      </div>
    </div>
  );
}

export default BookingCard;
