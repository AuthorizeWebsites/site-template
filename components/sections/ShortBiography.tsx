import Link from "next/link";

export interface ShortBiographyProps {
  header: string;
  showReadMoreButton: boolean;
  biography: string;
}

export function ShortBiography({
  header,
  showReadMoreButton,
  biography,
}: ShortBiographyProps) {
  return (
    <div className="flex flex-col w-full px-4 mx-auto mt-4 max-w-7xl sm:pl-12 sm:pr-4 sm:mt-16">
      <div className="z-10 self-center px-4 py-3 -mb-8 bg-gray-800 border border-gray-900 rounded-md shadow-lg sm:self-start sm:-ml-8">
        <h1 className="text-4xl font-semibold leading-tight tracking-wider text-white">
          {header}
        </h1>
      </div>
      <div className="px-6 pt-12 pb-6 space-y-6 bg-white border rounded-md shadow-xl border-gray-50">
        <div
          className="space-y-4 prose sm:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: biography }}
        />
        {showReadMoreButton && (
          <Link href="/about-me">
            <a className="inline-block px-4 py-2 text-xl font-semibold tracking-wider text-white bg-gray-800 rounded-md shadow-lg focus:shadow-outline-blue focus:outline-none hover:bg-gray-700">
              Read More
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
