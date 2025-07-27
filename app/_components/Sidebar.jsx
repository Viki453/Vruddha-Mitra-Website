"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlinePencil,
  HiOutlineBookmark,
} from "react-icons/hi2";
import SignoutButton from "./SignoutButton";

function Sidebar() {
  const pathName = usePathname();

  const navItems = [
    { href: "/account", icon: <HiOutlineHome />, label: "Home" },
    {
      href: "/account/profile",
      icon: <HiOutlinePencil />,
      label: "Edit Profile",
    },
    {
      href: "/account/reservations",
      icon: <HiOutlineBookmark />,
      label: "Reservations",
    },
  ];

  return (
    <aside className="flex flex-col justify-between h-full sticky top-0">
      <ul className="space-y-2">
        {navItems.map(({ href, icon, label }) => {
          const isActive = pathName === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-base-100 text-accent font-semibold shadow-sm"
                    : "text-base-content hover:bg-base-100 hover:text-accent"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-base">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <SignoutButton />
    </aside>
  );
}

export default Sidebar;
