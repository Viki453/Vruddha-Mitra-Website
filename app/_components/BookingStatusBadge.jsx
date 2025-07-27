function BookingStatusBadge({ status }) {
  status = status.slice(0, 1).toUpperCase() + status.slice(1, status.length);
  console.log(status);
  const badgeType =
    status === "Upcoming"
      ? "badge-info"
      : status === "Ongoing"
      ? "badge-success"
      : "badge-neutral";

  console.log(badgeType);
  return <div className={`badge ${badgeType} w-20`}>{status}</div>;
}

export default BookingStatusBadge;
