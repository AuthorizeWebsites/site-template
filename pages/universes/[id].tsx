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
    series,
    ["stand-alone"]: standAloneBooks,
  } = collections.universes[router.query.id as string];

  return (
    <div className="flex flex-col items-center px-4 pt-8 mx-auto space-y-8 max-w-7xl sm:pt-16">
      <div className="max-w-6xl mx-auto space-y-2 text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-wider text-gray-800">
          {name}
        </h2>
        <h3 className="text-xl font-light tracking-wide text-gray-600">
          {tagline}
        </h3>
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
      <div className="w-full p-4 space-y-4 bg-gray-900 rounded-md shadow-xl">
        {series.map((series) => (
          <Link href="/series/[id]" as={`/series/${series.id}`}>
            <a className="block w-full transition-all duration-300 ease-in-out transform hover:scale-95">
              <div className="flex flex-col items-center justify-center w-full p-4 space-y-2 text-center bg-gray-800 rounded-md shadow-xl">
                <h1 className="text-3xl font-semibold leading-tight tracking-wider text-white">
                  {series.name}
                </h1>
                <h3 className="text-xl font-light tracking-wide text-gray-100">
                  {series.tagline}
                </h3>
                <div className="flex flex-wrap justify-center w-full">
                  {series.books.map((bookProps) => (
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
            </a>
          </Link>
        ))}
        <div className="flex flex-col items-center w-full p-4 space-y-2 bg-gray-800 rounded-md shadow-xl">
          <h1 className="text-3xl font-semibold leading-tight tracking-wider text-center text-white">
            Stand-alone Books
          </h1>
          <div className="flex flex-wrap justify-center w-full">
            {standAloneBooks.map((bookProps) => (
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
    </div>
  );
}
