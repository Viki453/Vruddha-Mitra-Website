import Image from "next/image";
import { getBookingDisplayFormat } from "../_helpers/dateHelpers";
import BookingManageButton from "./BookingManageButton";
import BookingStatusBadge from "./BookingStatusBadge";
import ReviewButton from "./ReviewButton";

function BookingCard({ bookingData }) {
  console.log(bookingData);
  const {
    id: bookingId,
    created_at: bookedOn,
    vId,
    mId,
    date: bookingDate,
    status,
    mReview,
    vruddhas: {
      image: vruddhaImg,
      firstName: vruddhaFirstName,
      lastName: vruddhaLastName,
    },
  } = bookingData;
  console.log("in bookingx");
  const bkDate = getBookingDisplayFormat(bookedOn);
  const vsDate = getBookingDisplayFormat(bookingDate);
  console.log(bkDate);
  console.log(vsDate);

  return (
    <div className="flex gap-4 items-center bg-base-100 shadow rounded-lg p-4 mb-4">
      <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden relative">
        <Image
          src={vruddhaImg}
          fill
          alt="Vruddha"
          className="w-full h-full object-cover"
          quality={50}
        />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {vruddhaFirstName} {vruddhaLastName}
          </h2>

          {status === "past" && mReview != undefined ? (
            <div>
              <span>Your review: </span>
              <span>{mReview}</span>
            </div>
          ) : (
            ""
          )}
          <BookingStatusBadge status={status} />
        </div>
        <p className="text-sm text-gray-600">Booking ID: {bookingId}</p>
        <p className="text-sm text-gray-600">Visit Date: {vsDate}</p>
        <p className="text-sm text-gray-600">Booked On: {bkDate}</p>
      </div>

      <div className="flex flex-col gap-2 ml-4">
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
