"use client";
import { setReview } from "../_lib/actions";

function ReviewButton({ id }) {
  function handleReview() {
    const review = prompt("Please tell us your experience of your visit: ");
    setReview(id, review);
    console.log(review);
  }
  return (
    <div className="flex flex-col gap-2 ">
      <button className="btn btn-success" onClick={handleReview}>
        Review
      </button>
    </div>
  );
}

export default ReviewButton;
