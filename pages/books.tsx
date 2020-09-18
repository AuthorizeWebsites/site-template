import Link from "next/link";
import collections from "@forestry/collections";

export function Book(props: any) {
  return (
    <div className="p-4 overflow-hidden bg-gray-700 rounded-md shadow-inner">
      <Link href="/books/[id]" as={`/books/${props.id}`}>
        <a>
          <img
            src={props.covers[0]}
            className="w-full h-auto transition-all duration-300 ease-in-out transform rounded-md shadow-lg hover:scale-95"
          />
        </a>
      </Link>
    </div>
  );
}

export function Series(props: any) {
  return (
    <div className="p-4 space-y-4 bg-gray-800 rounded-md shadow-xl">
      <Link href="/series/[id]" as={`/series/${props.id}`}>
        <a className="inline-flex items-center text-xl font-semibold leading-tight tracking-wider text-white sm:text-2xl group">
          <span className="group-hover:text-transparent group-hover:bg-gradient-to-tr group-hover:from-yellow-300 group-hover:to-yellow-400 bg-clip-text">
            {props.name}
          </span>
          <span className="px-2 py-1 ml-2 text-base text-white uppercase bg-black bg-opacity-25 rounded-md shadow-lg">
            series
          </span>
        </a>
      </Link>
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {props.books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export function Universe(props: any) {
  return (
    <div className="p-4 space-y-4 bg-gray-900 rounded-md shadow-xl /flex /flex-col">
      <Link href="/universes/[id]" as={`/universes/${props.id}`}>
        <a className="inline-flex items-center text-2xl font-semibold leading-tight tracking-wider text-white sm:text-3xl group">
          <span className="group-hover:text-transparent group-hover:bg-gradient-to-tr group-hover:from-yellow-300 group-hover:to-yellow-400 bg-clip-text">
            {props.name}
          </span>
          <span className="px-2 py-1 ml-2 text-base text-white uppercase bg-black bg-opacity-25 rounded-md shadow-lg">
            universe
          </span>
        </a>
      </Link>
      {props.series.map((series) => (
        <Series key={series.id} {...series} />
      ))}
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {props.standAloneBooks.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default function Books() {
  return (
    <div className="w-full p-4 mx-auto space-y-4 max-w-7xl">
      <div className="py-4">
        <h1 className="text-4xl font-semibold leading-tight text-center text-gray-800">
          Books!
        </h1>
        <p className="max-w-6xl mx-auto tracking-wider text-center text-gray-700">
          Books are ordered hierarchically. (e.g. universes have books and
          series, and series have books). You can click on any book, series, or
          universe to get info on it.
        </p>
      </div>
      {Object.values(collections.universes).map((universe) => (
        <Universe key={universe.id} {...universe} />
      ))}
      {Object.values(collections.series)
        .filter((series) => !("universe" in series))
        .map((series) => (
          <Series key={series.id} {...series} />
        ))}
      <div className="p-4 space-y-4 bg-gray-800 rounded-md shadow-xl">
        <p className="inline-flex items-center text-xl font-semibold leading-tight tracking-wider text-white sm:text-2xl">
          Stand-alone Books
        </p>
        <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Object.values(collections.books)
            .filter((book) => !("series" in book || "universe" in book))
            .map((book) => (
              <Book key={book.id} {...book} />
            ))}
        </div>
      </div>
    </div>
  );
}
