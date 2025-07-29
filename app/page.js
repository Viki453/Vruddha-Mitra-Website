"use client";
import { Fleur_De_Leah } from "next/font/google";
import Image from "next/image";
import LandingImg1 from "../public/LandingImg1.jpg";
import LandingImg2 from "../public/LandingImg2.jpg";
import {
  HiOutlineCurrencyDollar,
  HiOutlineHandThumbUp,
  HiOutlineHeart,
  HiOutlineScale,
  HiOutlineStar,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const FleurDeLeah = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const features = [
  {
    title: "Promote independence",
    text: "Vruddha Mitra gives older adults and the elderly companion care and support to age in place.",
    icon: HiOutlineHandThumbUp,
  },
  {
    title: "Reduce inequities",
    text: "VruddhaMitra advances equity for populations that have been historically marginalized.",
    icon: HiOutlineScale,
  },
  {
    title: "Cure loneliness",
    text: "No one's meant to go it alone. With VruddhaMitra, “together” is just a call or click away.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Improve outcomes",
    text: "Research shows that members feel physically and mentally healthier with Mitras.",
    icon: HiOutlineHeart,
  },
  {
    title: "Control costs",
    text: "Papa members have fewer visits to the hospital and are more likely to receive preventive care—the results add up.",
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: "Increase satisfaction",
    text: "Our one-of-a-kind benefit helps health plans retain members and employers attract—and keep!—talent.",
    icon: HiOutlineStar,
  },
];

function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1
            className={`text-5xl sm:text-6xl md:text-[4.5rem] font-extrabold leading-tight ${FleurDeLeah.className}`}
          >
            Hi! <br />
            We&apos;re Vruddha Mitra.
          </h1>
          <p className="text-lg sm:text-xl mt-4">
            We all need a pal sometimes. That&apos;s why VruddhaMitra&apos;s
            here. We connect members and families to real people for companion
            care, daily tasks, transport, and more. It&apos;s human connection,
            delivered.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[400px] h-[400px] sm:h-[500px] overflow-hidden rounded-[30px] bg-white shadow-lg">
            <Image
              src={LandingImg1}
              alt="Helping elders"
              className="w-full h-full object-cover rounded-[30px]"
              quality={60}
              placeholder="blur"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Mitra Care</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Vruddha Mitra provides vital support and companion care to
            strengthen families, help elders stay connected, and support diverse
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, text, icon: Icon }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 border rounded-xl bg-base-100 shadow-sm"
            >
              <Icon className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-6 text-left">
          <h2 className="text-4xl font-bold">How it works</h2>
          <p className="text-lg text-gray-700">
            Available nationwide, Mitras offer hands-on help and heartfelt
            support— in-person or virtually.
          </p>
          <ol className="list-decimal ml-5 space-y-4 text-base text-gray-600">
            <li>
              <h3 className="font-semibold text-lg">
                Sign up through your participating plan.
              </h3>
              <p>
                Easy enrollment for Medicare, Medicaid, or employer-covered
                members.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-lg">
                Schedule a visit with a Mitra.
              </h3>
              <p>
                Convenient scheduling via our web app for members and employees.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-lg">
                Enjoy your time and tell us how we did.
              </h3>
              <p>
                Get real support for daily tasks, care, errands and more. Share
                feedback for continued quality.
              </p>
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[400px] h-[400px] sm:h-[500px] overflow-hidden rounded-[30px] bg-white shadow-lg">
            <Image
              src={LandingImg2}
              alt="Mitra working"
              className="w-full h-full object-cover rounded-[30px]"
              quality={60}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
