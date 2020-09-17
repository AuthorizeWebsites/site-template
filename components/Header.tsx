import { Transition } from "@tailwindui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export interface HeaderProps {}

const items = [
  { text: "Home", href: "/" },
  { text: "Books", href: "/books" },
  { text: "About Me", href: "/about-me" },
  { text: "Contact Me", href: "/contact-me" },
] as const;

function MobileMenu() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md /shadow-sm">
          <button
            onClick={() => setShow((prev) => !prev)}
            type="button"
            className="inline-flex justify-center w-full p-0 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white bg-opacity-0 rounded-md /border /border-gray-300 hover:text-gray-500 focus:outline-none focus:border-blue-300 /focus:shadow-outline-blue /active:bg-gray-50 active:text-gray-800"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <svg
              className="w-8 h-8 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </span>
      </div>
      <Transition
        show={show}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg"
      >
        <div className="absolute right-0 z-50 w-64 mt-4 -mr-2 origin-top-right rounded-md shadow-lg">
          <div className="bg-gray-800 rounded-md shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {items.map(({ text, href }) => (
                <Link href={href}>
                  <a
                    onClick={() => setShow(false)}
                    className="block px-4 py-2 text-lg leading-5 text-white focus:outline-none "
                    role="menuitem"
                  >
                    {text}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export function Header({}: HeaderProps) {
  const router = useRouter();

  return (
    <>
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between py-2 leading-none tracking-wider text-gray-700 bg-white bg-opacity-75 border-b border-gray-200 border-opacity-50 BD-FILTER">
        <div className="px-2 py-1 sm:p-2">
          <Link href="/">
            <a className="block p-1 text-3xl font-bold rounded-md sm:p-2 focus:outline-none hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-yellow-500 hover:text-transparent hover:bg-clip-text focus:text-gray-900">
              J.R.R. Tolkien
            </a>
          </Link>
        </div>
        <div className="max-w-full overflow-x-auto">
          <div className="hidden p-2 space-x-4 sm:flex">
            {items.map(({ text, href }) => (
              <div key={text} className="p-2">
                <Link href={href}>
                  <a className="font-medium whitespace-no-wrap focus:outline-none hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-yellow-500 hover:text-transparent hover:bg-clip-text focus:text-gray-900">
                    {text}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="block px-4 py-2 sm:p-4 sm:hidden">
          <MobileMenu />
        </div>
      </header>
      <style jsx>{`
        .BD-FILTER {
          backdrop-filter: blur(16px);
        }
      `}</style>
    </>
  );
}
