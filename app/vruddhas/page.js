import { getVruddhas } from "../_lib/data-service";
import VruddhaList from "../_components/VruddhaList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import ReservationReminder from "../_components/ReservationReminder";
import { Fleur_De_Leah } from "next/font/google";

const FleurDeLeah = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

export const revalidate = 15;

function page() {
  return (
    <div className="flex flex-col gap-10 p-18 max-w-7xl mx-auto">
      <h1
        className={`text-8xl md:text-[5rem] leading-tight font-extrabold ${FleurDeLeah.className}`}
      >
        Our Lovely Family
      </h1>
      <div className="space-y-4 text-2xl leading-relaxed text-base-content my-10 flex flex-col gap-4 ">
        <p className="">
          At <span className="font-semibold">Vruddha Mitra</span>, we believe
          that every elder deserves warmth, laughter, and meaningful
          companionship. Your visit isn&apos;t just a kind gesture — it becomes
          a cherished moment in someone&apos;s day.
        </p>

        <p>
          Our extended family of <span className="italic">vruddhas</span>{" "}
          welcomes you with open arms and full hearts. Whether it&apos;s a chat
          over chai, a walk in the garden, or simply your presence — it uplifts
          their spirits and brings genuine joy.
        </p>

        <p>
          Meet our family below and bring your love and time to those who need
          it most. Your visit can make their day — and maybe even change yours
          too.
        </p>

        <blockquote className="italic text-base-content/70 border-l-4 border-base-300 pl-4 my-10">
          “When someone visits, it feels like my grandchild is home again.”
        </blockquote>
        <Suspense fallback={<Spinner />}>
          <VruddhaList />
          <ReservationReminder />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
