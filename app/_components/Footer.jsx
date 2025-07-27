import Link from "next/link";
import { PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";
import { auth } from "../_lib/auth";

async function Footer() {
  const year = new Date().getFullYear();
  const session = await auth();

  return (
    <footer
      aria-label="Site Footer"
      className="mt-auto w-full bg-neutral text-neutral-50"
    >
      <ul className="flex flex-wrap justify-center items-center gap-6 py-6 text-sm sm:text-base">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">
            Why Us
          </Link>
        </li>
        <li>
          <Link
            href={session.user ? "/account" : "/login"}
            className="hover:underline"
          >
            Be a VruddhaMitra
          </Link>
        </li>
      </ul>

      <div className="flex justify-center items-center gap-6 pb-4">
        <Link
          href="https://github.com/Viki453"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="text-2xl hover:text-gray-300 transition"
        >
          <PiGithubLogo />
        </Link>
        <Link
          href="https://www.linkedin.com/in/vikrant-gandhekar/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="text-2xl hover:text-gray-300 transition"
        >
          <PiLinkedinLogo />
        </Link>
      </div>

      <p className="text-center text-sm py-3 border-t border-neutral-600">
        ⓒ {year} Vruddha Mitra. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
