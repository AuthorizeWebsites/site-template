import Link from "next/link";
import { useRouter } from "next/router";

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  const router = useRouter();

  return (
    <>
      <header className="sticky top-0 flex flex-wrap items-center justify-between py-2 leading-none tracking-wider text-gray-600 bg-white bg-opacity-75 border-b border-gray-100 BD-FILTER">
        <div className="p-2">
          <Link href="/">
            <a className="block p-2 text-3xl font-bold rounded-md focus:outline-none hover:bg-gradient-to-tr hover:from-orange-400 hover:to-red-600 hover:text-transparent hover:bg-clip-text focus:text-gray-900">
              Author Name
            </a>
          </Link>
        </div>
        <div className="flex p-2 space-x-4">
          {[
            { text: "Home", href: "/" },
            { text: "Books", href: "/books" },
            { text: "About Me", href: "/about-me" },
            { text: "Contact Me", href: "/contact-me" },
          ].map(({ text, href }) => (
            <div
              className={`${
                router.asPath === href
                  ? "bg-gray-300 bg-opacity-25 rounded-md"
                  : ""
              } p-2`}
            >
              <Link href={href}>
                <a className="font-medium whitespace-no-wrap focus:outline-none hover:bg-gradient-to-tr hover:from-orange-400 hover:to-red-600 hover:text-transparent hover:bg-clip-text focus:text-gray-900">
                  {text}
                </a>
              </Link>
            </div>
          ))}
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
