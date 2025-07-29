"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full relative">
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-base-200 p-4 pt-25
      transition-transform duration-200 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:relative lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="flex-1 flex flex-col pt-20 transition-all duration-300 ease-in-out
      w-full lg:pl-64"
      >
        <button
          className="lg:hidden p-2 bg-base-200 shadow-md m-4 w-max rounded z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiOutlineBars3 className="text-xl" />
        </button>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-16">{children}</main>
      </div>
    </div>
  );
}
