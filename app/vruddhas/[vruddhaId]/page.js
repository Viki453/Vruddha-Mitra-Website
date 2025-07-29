import Image from "next/image";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import {
  getMitra,
  getVruddha,
  getVruddhaBookingsDates,
  getVruddhas,
} from "../../_lib/data-service";
import { notFound } from "next/navigation";
import ReservationDate from "../../_components/ReservationDate";
import { auth } from "../../_lib/auth";
import LoginMessage from "../../_components/LoginMessage";
import FillUserDetails from "../../_components/FillUserDetails";

export async function generateStaticParams() {
  const vruddhas = await getVruddhas();
  return vruddhas.map((vruddha) => ({ vruddhaId: String(vruddha.id) }));
}

async function Page({ params }) {
  const vruddhaId = parseInt(params.vruddhaId);
  const session = await auth();

  let [vData, vDates] = await Promise.all([
    getVruddha(vruddhaId),
    getVruddhaBookingsDates(vruddhaId),
  ]);

  vData = vData[0];
  if (!vData) notFound();

  const mitra = await getMitra(session?.user?.accountId);

  function isProfileComplete(mitra) {
    return (
      mitra[0]?.firstName?.trim() &&
      mitra[0]?.lastName?.trim() &&
      mitra[0]?.gender?.trim() &&
      mitra[0]?.DOB?.trim() &&
      /^[6-9]\d{9}$/.test(mitra[0]?.phoneNo || "") &&
      mitra[0]?.languages?.trim() &&
      mitra[0]?.description?.trim()
    );
  }

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto space-y-14">
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-700">
          Namaste!
        </h1>
        <h2 className="text-3xl sm:text-5xl font-medium text-amber-800">
          I&apos;m {vData.firstName} {vData.lastName}
        </h2>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="relative h-72 sm:h-[350px] w-full col-span-2">
          <Image
            src={vData.image}
            alt={`${vData.firstName}'s photo`}
            fill
            quality={80}
            className="object-cover rounded-2xl"
            placeholder="empty"
          />
        </div>

        <div className="col-span-3 space-y-4">
          <div className="flex flex-wrap gap-6 items-center text-lg font-semibold">
            <div>
              <strong>Age:</strong> {vData.age}
            </div>
            <div className="flex items-center gap-2">
              <strong>Gender:</strong>
              {vData.gender === "male" ? (
                <PiGenderMaleBold className="text-blue-700 text-xl" />
              ) : (
                <PiGenderFemaleBold className="text-pink-500 text-xl" />
              )}
            </div>
          </div>

          <div className="text-base">
            <strong>Birth Date:</strong> {vData.birthDate || "Not Provided"}
          </div>
          <div className="text-base">
            <strong>About Me:</strong>{" "}
            {vData.description || "A unique soul with a special story."}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">Likes</h3>
          <ul className="list-disc ml-6 space-y-1">
            {vData.likes.split(",").map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2">Dislikes</h3>
          <ul className="list-disc ml-6 space-y-1">
            {vData.dislikes.split(",").map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2">I Speak</h3>
          {vData.languages ? (
            <ul className="list-disc ml-6 space-y-1">
              {vData.languages.split(",").map((lang, i) => (
                <li key={i}>{lang.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="ml-6 italic text-gray-500">No languages listed</p>
          )}
        </div>
      </section>

      <section className="text-lg space-y-3">
        <p>
          <strong>Health History:</strong>{" "}
          {vData.healthHistory || "No health concerns shared."}
        </p>
        <p>
          <strong>Advice I Live By:</strong>{" "}
          <em>“{vData.advise || "Kindness is timeless."}”</em>
        </p>
      </section>

      <section className="text-center mt-12 space-y-6">
        <h2 className="text-4xl font-bold">
          Book your visit with {vData.firstName}
        </h2>
        {session?.user ? (
          isProfileComplete(mitra) ? (
            <ReservationDate
              vDates={vDates}
              vName={vData.firstName}
              vId={vData.id}
              mId={session.user.accountId}
            />
          ) : (
            <FillUserDetails />
          )
        ) : (
          <LoginMessage vName={vData.firstName} />
        )}
      </section>
    </div>
  );
}

export default Page;
