import { getDate, getDay, getMonth, getYear } from "date-fns";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function getBookingDisplayFormat(date) {
  const Day = daysOfWeek[getDay(date)];
  const Month = months[getMonth(date)];
  const Date = getDate(date);
  const Year = getYear(date);

  return `${Day}, ${Date} ${Month} ${Year}`;
}
