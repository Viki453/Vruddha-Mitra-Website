"use client";
import Link from "next/link";
import { Fleur_De_Leah } from "next/font/google";

const FleurDeLeah = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

function WhyUsPage() {
  return (
    <div className=" max-w-screen-xl mx-auto p-18">
      <div className="flex flex-col items-start gap-6 text-left">
        <h1
          className={`text-8xl md:text-[5rem] leading-tight font-extrabold ${FleurDeLeah.className}`}
        >
          Why Vruddha Mitra?
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl">
          Loneliness and social isolation are more than just sad feelings — they
          are serious public health concerns. For older adults in old age homes,
          these conditions can significantly increase the risk of chronic
          diseases, cognitive decline, and even early death. Vruddha Mitra
          exists to change that.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-4">
          The Health Impacts of Isolation
        </h2>
        <ul className="list-disc ml-6 space-y-3 text-lg text-gray-800">
          <li>Increased risk of depression and anxiety</li>
          <li>Accelerated cognitive decline and risk of dementia</li>
          <li>Weakened immune system and delayed recovery</li>
          <li>Greater dependency on medications and hospitalization</li>
          <li>Heightened risk of premature mortality</li>
        </ul>
      </div>

      <div className="mt-16 max-w-3xl">
        <p className="text-xl text-gray-700">
          At <span className="font-semibold">Vruddha Mitra</span>, we believe no
          one should grow old alone. Our mission is to bring joy, companionship,
          and dignity back into the lives of the elderly by bridging generations
          and building meaningful connections.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Voices from Our Elders</h2>
        <div className="bg-base-300 rounded-lg p-6 text-center text-lg text-gray-700">
          <em>
            &quot;I thought I was forgotten. But now, I have people to talk to
            again. I feel seen, and that means everything.&quot; - A Vruddha
            Mitra participant
          </em>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-20">
        <h3 className="text-3xl font-semibold mb-4 text-center">
          Be part of their second childhood.
        </h3>
        <Link
          href="/vruddhas"
          className="text-lg px-6 py-2 bg-primary rounded-sm"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
}

export default WhyUsPage;
