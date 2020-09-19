import { ImageSection } from "@components/ImageSection";
import { useRouter } from "next/router";
import { BuyLinks } from "@components/BuyLinks";
import collections from "@forestry/collections";
import Link from "next/link";

export default function BooksIdPage() {
  const router = useRouter();

  if (router?.query?.id === undefined) return null;

  const {
    cover,
    title,
    tagline,
    description,
    buyLinks,
    universe,
    series,
    genres,
  } = collections.books[router.query.id as string];

  return (
    <div className="flex flex-col space-y-8 sm:space-y-8">
      <ImageSection imgUrl={cover}>
        <div className="flex flex-col items-center max-w-3xl pt-8 space-y-4 text-center">
          <h1 className="text-3xl font-semibold leading-tight tracking-wider text-white">
            {title}
          </h1>
          <h2 className="text-xl font-light tracking-wider text-white">
            {tagline}
          </h2>
          <p className="max-w-3xl mx-auto text-center">
            {genres
              .map(({ genreName }) => genreName)
              .map((name) => (
                <Link
                  key={name}
                  href="/genres/[id]"
                  as={`/genres/${name.split(" ").join("")}`}
                >
                  <a className="px-3 py-2 m-2 text-gray-800 transition-all duration-300 ease-in-out bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-200">
                    {name}
                  </a>
                </Link>
              ))}
          </p>
        </div>
      </ImageSection>
      <div
        className="px-4 mx-auto prose max-w-7xl sm:prose-lg"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {series && series.length > 0 && (
        <div className="w-full px-4 mx-auto max-w-7xl">
          <Link href="/series/[id]" as={`/series/${series[0].id}`}>
            <a className="block w-full p-4 font-bold leading-tight tracking-wider text-center text-white transition-all duration-500 ease-in-out transform bg-gray-800 rounded-md shadow-xl group hover:scale-95 ">
              {title} is part of the{" "}
              <span className="transition-all duration-500 ease-in-out group-hover:text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-400">
                {series.map(({ name }) => name).join(", ")}
              </span>{" "}
              series.
            </a>
          </Link>
        </div>
      )}
      {universe && universe.length > 0 && (
        <div className="w-full px-4 mx-auto max-w-7xl">
          <Link href="/universes/[id]" as={`/universes/${universe[0].id}`}>
            <a className="block w-full p-4 font-bold leading-tight tracking-wider text-center text-white transition-all duration-500 ease-in-out transform bg-gray-800 rounded-md shadow-xl group hover:scale-95 ">
              {title} is part of the{" "}
              <span className="transition-all duration-500 ease-in-out group-hover:text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-400">
                {universe.map(({ name }) => name).join(", ")}
              </span>{" "}
              literary universe.
            </a>
          </Link>
        </div>
      )}
      {buyLinks.length > 0 && (
        <div className="w-full px-4 mx-auto max-w-7xl">
          <BuyLinks buyLinks={buyLinks} />
        </div>
      )}
    </div>
  );
}
