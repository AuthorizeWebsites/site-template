import Link from "next/link";

export function Footer() {
  return (
    <div className="flex items-center justify-center p-2">
      <p className="text-sm font-light tracking-wider text-center text-gray-800">
        Owned by{" "}
        <Link href="/about-me">
          <a className="text-transparent bg-clip-text bg-gradient-to-tl from-yellow-400 to-yellow-500">
            J.R.R. Tolkien
          </a>
        </Link>{" "}
        &middot; Made by{" "}
        <a
          href="https://authorizewebsites.com"
          target="_blank"
          rel="noopener"
          className="text-transparent bg-clip-text bg-gradient-to-tl from-yellow-400 to-yellow-500"
        >
          Authorize
        </a>
      </p>
    </div>
  );
}
