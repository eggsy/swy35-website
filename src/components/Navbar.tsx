import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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

  return (
    <nav className="flex py-10 items-center justify-between flex-wrap gap-8 md:gap-12 container-app">
      <Link
        href="/"
        className="flex w-full md:w-max flex-col md:flex-row justify-center md:justify-start items-center gap-4"
      >
        <Image
          src="/logo.png"
          alt="SWY35 Türkiye Delegation logo"
          width={60}
          height={60}
          priority
        />

        <div className="flex flex-col items-center gap-1 md:items-start text-center">
          <span className="md:text-lg text-xl font-bold text-brand">
            SWY35 Türkiye
          </span>
          <span className="text-black/50 text-xs md:text-sm w-3/4 md:w-full">
            One ship, many journeys, endless connections!
          </span>
        </div>
      </Link>

      <ul className="flex items-center justify-center rounded-lg overflow-auto pl-14 md:pl-0 w-full md:w-max">
        {pages.map((page) => (
          <li key={page.path}>
            <Link
              className={`
              bg-black/5 block hover:bg-black/10 md:hover:bg-transparent md:bg-transparent p-4
              ${
                router.pathname === page.path
                  ? "text-brand"
                  : "text-gray-500 hover:text-brand"
              }`}
              href={page.path}
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
