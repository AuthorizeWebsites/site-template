import Link from "next/link";
import collections from "@forestry/collections";

export function Book(props: any) {
  return (
    <div className="p-4 overflow-hidden bg-gray-700 rounded-md shadow-inner">
      <Link href="/books/[id]" as={`/books/${props.id}`}>
        <a>
          <img
            src={props.covers[0]}
            className="transition-all duration-300 ease-in-out transform rounded-md shadow-lg hover:scale-95"
          />
        </a>
      </Link>
    </div>
  );
}

function Series(props: any) {
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
          <Book {...book} />
        ))}
      </div>
    </div>
  );
}

function Universe(props: any) {
  return (
    <div className="flex flex-col p-4 space-y-4 bg-gray-900 rounded-md shadow-xl">
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
        <Series {...series} />
      ))}
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {props["stand-alone"].map((book) => (
          <Book {...book} />
        ))}
      </div>
    </div>
  );
}

export default function Books() {
  return (
    <div className="p-4 mx-auto space-y-4 max-w-7xl">
      {Object.values(collections.universes).map((universe) => (
        <Universe {...universe} />
      ))}
      {Object.values(collections.series)
        .filter((series) => !("universe" in series))
        .map((series) => (
          <Series {...series} />
        ))}
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Object.values(collections.books)
          .filter((book) => !("series" in book || "universe" in book))
          .map((props) => (
            <Book {...props} />
          ))}
      </div>
    </div>
  );
}
