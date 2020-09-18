import { useRouter } from "next/router";
import Link from "next/link";
import collections from "@forestry/collections";

export default function BooksIdPage() {
  const router = useRouter();

  if (router?.query?.id === undefined) return null;

  const {
    name,
    tagline,
    description,
    books,
    universe,
    genres,
  } = collections.series[router.query.id as string];

  return (
    <div>
      <div className="flex flex-col items-center px-4 pt-8 mx-auto space-y-8 max-w-7xl sm:pt-16">
        <div className="max-w-6xl mx-auto space-y-2 text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-wider text-gray-800">
            {name}
          </h2>
          <h3 className="text-xl font-light tracking-wide text-gray-600">
            {tagline}
          </h3>
          <p className="max-w-3xl pt-2 mx-auto text-center">
            {genres
              .map(({ genreName }) => genreName)
              .map((name) => (
                <Link
                  key={name}
                  href="/genres/[id]"
                  as={`/genres/${name.split(" ").join("")}`}
                >
                  <a className="px-3 py-2 m-2 text-white transition-all duration-300 ease-in-out bg-gray-800 rounded-full shadow-md opacity-75 hover:opacity-100 hover:shadow-lg hover:bg-gray-900">
                    {name}
                  </a>
                </Link>
              ))}
          </p>
        </div>
        {description && (
          <>
            <hr className="w-full" />
            <div
              className="prose sm:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </>
        )}
        {universe && universe.length > 0 && (
          <Link href="/universes/[id]" as={`/universes/${universe[0].id}`}>
            <a className="block w-full p-4 font-bold leading-tight tracking-wider text-center text-white transition-all duration-300 ease-in-out transform bg-gray-800 rounded-md shadow-xl group hover:scale-95 ">
              {name} is part of the{" "}
              <span className="transition-all duration-500 ease-in-out group-hover:text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-400">
                {universe.map(({ name }) => name).join(", ")}
              </span>{" "}
              literary universe.
            </a>
          </Link>
        )}
        <div className="flex flex-wrap justify-center w-full p-2 bg-gray-800 rounded-md shadow-xl">
          {books.map((bookProps) => (
            <div className="p-2">
              <div className="p-4 overflow-hidden bg-gray-700 rounded-md shadow-inner">
                <Link href="/books/[id]" as={`/books/${bookProps.id}`}>
                  <a>
                    <img
                      src={bookProps.covers[0]}
                      className="transition-all duration-300 ease-in-out transform rounded-md shadow-lg h-72 hover:scale-95"
                    />
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
