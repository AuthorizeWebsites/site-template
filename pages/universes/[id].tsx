import { useRouter } from "next/router";
import Link from "next/link";
import collections from "@forestry/collections";
import { Book, Series } from "@pages/books";

export default function BooksIdPage() {
  const router = useRouter();

  if (router?.query?.id === undefined) return null;

  const {
    name,
    tagline,
    description,
    series,
    standAloneBooks,
    genres,
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
      <div className="w-full space-y-4 /p-4 /bg-gray-900 /rounded-md /shadow-xl">
        {series.map((series) => (
          <Series {...series} />
        ))}
        <div className="p-4 space-y-4 bg-gray-800 rounded-md shadow-xl">
          <p className="inline-flex items-center text-xl font-semibold leading-tight tracking-wider text-white sm:text-2xl">
            Stand-alone Books
          </p>
          <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {standAloneBooks.map((book) => (
              <Book key={book.id} {...book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
