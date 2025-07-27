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
  const year = new Date().getFullYear();

  return (
    <div className=" p-18">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center md:items-start text-left mt-5">
          <h1
            className={`text-8xl md:text-[5rem] leading-tight font-extrabold ${FleurDeLeah.className}`}
          >
            Hi! We&apos;re Vruddha Mitra.
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            We all need a pal sometimes. That&apos;s why VruddhaMitra&apos;s
            here. VruddhaMitra helps health plans and employers connect members
            and their families to real people for help with companion care,
            everyday tasks, transportation, and more. It&apos;s vital human
            connection, right to the front door.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="h-[500px] w-[400px] overflow-hidden rounded-[50px] bg-white">
            <Image
              src={LandingImg1}
              alt="Helping elders"
              className="h-full w-full object-cover rounded-[50px] shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20 max-w-screen-xl mx-auto">
        <div className="row-span-full flex justify-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Mitra Care</h1>
            <p className="text-xl">
              Vruddha Mitra provide vital social support and companion care to
              strengthen families, help older adults remain connected, and
              support diverse communities—providing win-win benefits for all.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] text-center">
          {features.map(({ title, text, icon: Icon }, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 p-4  ">
              <Icon className="h-10 w-10 " />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">How it works</h1>
          <p>
            Available nationwide, in-person or by phone, Mitras offer a hand to
            help, a shoulder to lean on, and an ear to listen.
          </p>
          <ol className="list-decimal ml-5 space-y-4">
            <li>
              <h3 className="font-semibold text-lg">
                Sign up through your participating plan.
              </h3>
              <p>
                Flexible enrollment processes help members take advantage of
                their Medicare Advantage, Medicaid, or employer-provided
                benefit.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-lg">
                Schedule a visit with a Mitra.
              </h3>
              <p>
                Health plan members can schedule appointments by their
                computers. Employees have the flexibility of web application.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-lg">
                Enjoy your time and tell us how we did.
              </h3>
              <p>
                Members and loved ones receive support from Mitras for companion
                care, help with children and pets, transportation, errands, and
                more. Post-visit surveys help us make sure it&apos;s the perfect
                Mitra every time!
              </p>
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <div className="h-[500px] w-[400px] overflow-hidden rounded-[50px] bg-white">
            <Image
              src={LandingImg2}
              alt="Mitra working"
              className="h-full w-full object-cover rounded-[50px] shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
