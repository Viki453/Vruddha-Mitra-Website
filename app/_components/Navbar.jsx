import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import icon from "/public/icon.png";

async function Navbar() {
  const session = await auth();
  console.log(session);

  return (
    <div className=" mx-auto w-full fixed flex justify-between p-5 m-3 z-30 ">
      <div className="w-auto flex flex-row items-center gap-4 p-2 rounded-full backdrop-blur-sm shadow-lg border border-accent px-3 ">
        <Image src={icon} className="w-10 h-10 aspect-square rounded-full" />
        <Link href="/" className="font-bold whitespace-nowrap text-lg">
          Vruddha Mitra
        </Link>
      </div>
      <ul className="flex flex-row justify-end gap-4 items-center bg-base-content p-3 rounded-4xl shadow-lg border border-primary-content text-base-200 backdrop-blur-2xl">
        <li>
          <Link href="/about">Why us?</Link>
        </li>
        <li>
          <Link href="/vruddhas">Our Family</Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="h-8 rounded-full flex justify-center content-center items-center gap-2"
            >
              <span>{session.user.name.split(" ")[0]}</span>
              <div className=" h-8  w-8 relative">
                <Image
                  fill
                  className="h-full w-full rounded-full object-cover"
                  src={session.user.accountAvatar ?? session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
          ) : (
            <Link href="/account">Account</Link>
          )}
        </li>
        {/* <li>
          <Link href="/login">Login</Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Navbar;
