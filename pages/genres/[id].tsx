import collections, {
  Book,
  Collection,
  Series,
  Universe,
} from "@forestry/collections";
import {
  Book as BookComp,
  Series as SeriesComp,
  Universe as UniverseComp,
} from "@pages/books";
import { useRouter } from "next/router";

export default function GenresIdPage() {
  const router = useRouter();

  if (!router?.query?.id) return null;

  const filtered: {
    books: Collection<Book>;
    series: Collection<Series>;
    universes: Collection<Universe>;
  } = Object.fromEntries(
    Object.entries(collections).map(([collectionName, collection]) => [
      collectionName,
      Object.fromEntries<Universe | Series | Book>(
        Object.entries(collection)
          .filter(([_, value]) => "genres" in value)
          .filter(([_, { genres }]) =>
            genres
              .map(({ genreName }) => genreName.split(" ").join(""))
              .includes(router.query.id as string)
          )
      ),
    ])
  ) as {
    books: Collection<Book>;
    series: Collection<Series>;
    universes: Collection<Universe>;
  };

  return (
    // <div className="p-4 mx-auto max-w-7xl">
    //   <div className="w-full p-8 space-y-8 bg-gray-100 rounded-md shadow-inner">
    //     <h1 className="text-2xl font-bold leading-tight tracking-wider text-center text-gray-800 sm:text-4xl">
    // {
    //   Object.values(filtered)
    //     .flatMap((value) => Object.values(value))[0]
    //     .genres.map(({ genreName }) => genreName)
    //     .filter(
    //       (name: string) =>
    //         name.split(" ").join("") === (router.query.id as string)
    //     )[0]
    // }
    //     </h1>
    //     {Object.values(filtered.universes).map((universe) => (
    //       <UniverseComp {...universe} />
    //     ))}
    //     {Object.values(filtered.series)
    // .filter(({ universe }) => {
    //   if (universe === undefined) return true;
    //   return universe.reduce(
    //     (acc, universe) =>
    //       acc &&
    //       !Object.values(filtered.universes).some(
    //         ({ id }) => id === universe.id
    //       ),
    //     true
    //   );
    // })
    //       .map((series) => (
    //         <SeriesComp {...series} />
    //       ))}
    //     <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    //       {Object.values(filtered.books)
    // .filter(({ universe }) => {
    //   if (universe === undefined) return true;
    //   return universe.reduce(
    //     (acc, universe) =>
    //       acc &&
    //       !Object.values(filtered.universes).some(
    //         ({ id }) => id === universe.id
    //       ),
    //     true
    //   );
    // })
    // .filter(({ series }) => {
    //   if (series === undefined) return true;
    //   return series.reduce(
    //     (acc, series) =>
    //       acc &&
    //       !Object.values(filtered.series).some(
    //         ({ id }) => id === series.id
    //       ),
    //     true
    //   );
    // })
    //         .map((book) => (
    //           <BookComp {...book} />
    //         ))}
    //     </div>
    //   </div>
    // </div>

    <div className="w-full p-4 mx-auto space-y-4 max-w-7xl">
      <div className="py-4">
        <h1 className="text-4xl font-semibold leading-tight text-center text-gray-800">
          {
            Object.values(filtered)
              .flatMap((value) => Object.values(value))[0]
              .genres.map(({ genreName }) => genreName)
              .filter(
                (name: string) =>
                  name.split(" ").join("") === (router.query.id as string)
              )[0]
          }
        </h1>
        <p className="max-w-6xl mx-auto tracking-wider text-center text-gray-700">
          These are all the books in the{" "}
          {
            Object.values(filtered)
              .flatMap((value) => Object.values(value))[0]
              .genres.map(({ genreName }) => genreName)
              .filter(
                (name: string) =>
                  name.split(" ").join("") === (router.query.id as string)
              )[0]
          }{" "}
          genre. Books are ordered hierarchically. (e.g. universes have books
          and series, and series have books). You can click on any book, series,
          or universe to get info on it.
        </p>
      </div>
      {Object.values(filtered.universes).map((universe) => (
        <UniverseComp key={universe.id} {...universe} />
      ))}
      {Object.values(filtered.series)
        .filter(({ universe }) => {
          if (universe === undefined) return true;
          return universe.reduce(
            (acc, universe) =>
              acc &&
              !Object.values(filtered.universes).some(
                ({ id }) => id === universe.id
              ),
            true
          );
        })
        .map((series) => (
          <SeriesComp key={series.id} {...series} />
        ))}
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Object.values(filtered.books)
          .filter(({ universe }) => {
            if (universe === undefined) return true;
            return universe.reduce(
              (acc, universe) =>
                acc &&
                !Object.values(filtered.universes).some(
                  ({ id }) => id === universe.id
                ),
              true
            );
          })
          .filter(({ series }) => {
            if (series === undefined) return true;
            return series.reduce(
              (acc, series) =>
                acc &&
                !Object.values(filtered.series).some(
                  ({ id }) => id === series.id
                ),
              true
            );
          })
          .map((props) => (
            <BookComp key={props.id} {...props} />
          ))}
      </div>
    </div>
  );
}
