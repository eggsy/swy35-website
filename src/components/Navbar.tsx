import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbMenu2, TbMenuDeep } from "react-icons/tb";

const pages = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/#about",
  },
  {
    title: "Gallery",
    path: "/gallery",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

export const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex py-10 items-center justify-between flex-wrap gap-8 lg:gap-12 container-app">
      <div className="flex items-center justify-between gap-4 w-full lg:w-max">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="SWY35 Türkiye Delegation logo"
            width={60}
            height={60}
            priority
          />

          <div className="flex flex-col gap-1 lg:gap-0">
            <span className="md:text-lg text-xl font-bold text-brand">
              SWY35 Türkiye
            </span>

            <span className="text-black/50 hidden lg:block text-xs md:text-sm w-3/4 md:w-full">
              One ship, many journeys, endless connections!
            </span>
          </div>
        </Link>

        <button
          type="button"
          className="block lg:hidden bg-black/5 rounded-lg p-2 hover:bg-black/10 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <TbMenuDeep size={26} /> : <TbMenu2 size={26} />}
        </button>
      </div>

      <ul
        className={`
          ${isOpen ? "flex" : "hidden lg:flex"}
           flex-col lg:flex-row justify-evenly items-center bg-black/5 md:bg-transparent md:gap-8 rounded-lg overflow-auto w-full md:w-max`}
      >
        {pages.map((page) => (
          <li key={page.path}>
            <Link
              className={`
              block flex-shrink-0 py-4
              ${
                router.pathname === page.path
                  ? "text-brand"
                  : "text-gray-500 hover:text-brand"
              }`}
              href={page.path}
              onClick={() => setIsOpen(false)}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
