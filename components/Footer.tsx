import Link from "next/link";

export function Footer() {
  return (
    <div className="flex items-center justify-center p-2">
      <p className="text-sm font-light tracking-wider text-gray-800">
        Owned by{" "}
        <Link href="/about-me">
          <a className="text-transparent bg-clip-text bg-gradient-to-tl from-orange-400 to-red-600">
            Author Name
          </a>
        </Link>{" "}
        &middot; Made by{" "}
        <a
          href="https://authorizewebsites.com"
          target="_blank"
          rel="noopener"
          className="text-transparent bg-clip-text bg-gradient-to-tl from-orange-400 to-red-600"
        >
          Authorize
        </a>
      </p>
    </div>
  );
}
