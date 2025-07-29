"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineBars3 } from "react-icons/hi2";
import icon from "../icon.png";
import { auth } from "../_lib/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const data = await auth();
      setSession(data);
    }

    fetchSession();
  }, []);

  return (
    <>
      {/* Navbar Wrapper */}
      <div className="fixed top-0 left-0 w-full z-30 px-4 py-3 flex justify-between items-center bg-base-100 shadow-md">
        {/* Left Logo */}
        <div className="flex items-center gap-4 p-2 rounded-full shadow-lg border border-accent backdrop-blur-md px-3">
          <Image src={icon} className="w-10 h-10 rounded-full" alt="Profile" />
          <Link href="/" className="font-bold text-lg whitespace-nowrap">
            Vruddha Mitra
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row justify-end gap-4 items-center bg-base-content text-base-200 p-3 rounded-4xl shadow-lg border border-primary-content backdrop-blur-2xl">
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
                className="h-8 flex items-center gap-2 rounded-full"
              >
                <span>{session.user.name.split(" ")[0]}</span>
                <div className="relative h-8 w-8">
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
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-xl p-2 rounded-lg bg-base-content text-base-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HiOutlineBars3 />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-200 text-base-content shadow-md px-6 py-4 mt-20 fixed top-0 left-0 w-full z-20">
          <div className="flex flex-col gap-4">
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              Why us?
            </Link>
            <Link href="/vruddhas" onClick={() => setMenuOpen(false)}>
              Our Family
            </Link>
            <Link href="/account" onClick={() => setMenuOpen(false)}>
              {session?.user?.name
                ? session.user.name.split(" ")[0]
                : "Account"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
