import * as _books from "./books";
import * as _series from "./series";
import * as _universes from "./universes";

type RelativeURL = string;

type StringifiedHTML = string;

type FilePath = string;

export type Collection<T> = { [_: string]: T | undefined };

type ForestryItem = ForestryBook | ForestrySeries | ForestryUniverse;

type PartiallyLinkedItem = Bookish | Seriesish | Universeish;

interface Genre {
  genreName: string;
}

interface ForestryBook {
  authors: string[];
  cover: RelativeURL;
  title?: string;
  tagline?: string;
  description?: StringifiedHTML;
  buyLinks: any[];
  genres: Genre[];
}

interface Bookish extends ForestryBook {
  id?: string;
  series?: Seriesish[];
  universe?: Universeish[];
}

export interface Book extends Bookish {
  id: string;
  series?: Series[];
  universe?: Universe[];
}

const books: Collection<ForestryBook> = _books;

interface ForestrySeries {
  name?: string;
  tagline?: string;
  description?: StringifiedHTML;
  books: FilePath[];
  genres: Genre[];
}

interface Seriesish extends Omit<ForestrySeries, "books"> {
  books: (FilePath | Bookish)[];
  id?: string;
  universe?: Universeish[];
}

export interface Series extends Omit<Seriesish, "books"> {
  books: Book[];
  id: string;
  universe?: Universe[];
}

const series: Collection<ForestrySeries> = _series;

interface ForestryUniverse {
  name?: string;
  tagline?: string;
  description?: StringifiedHTML;
  series: FilePath[];
  standAloneBooks: FilePath[];
  genres: Genre[];
}

interface Universeish
  extends Omit<ForestryUniverse, "series" | "standAloneBooks"> {
  series: (FilePath | Seriesish)[];
  standAloneBooks: (FilePath | Bookish)[];
  id?: string;
}

export interface Universe
  extends Omit<Universeish, "series" | "standAloneBooks"> {
  series: Series[];
  standAloneBooks: Book[];
  id: string;
}

const universes: Collection<ForestryUniverse> = _universes;

interface Possibility {
  readonly key: string;
  readonly from:
    | Collection<PartiallyLinkedItem>
    | Collection<PartiallyLinkedItem>[];
}

type Possibilities = readonly Possibility[];

const injectIds = <T, Q>(
  obj: Collection<Collection<T>>
): Collection<Collection<Q>> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      Object.fromEntries(
        Object.entries(value).map(([key, value]) => [
          key,
          ({ ...value, id: key } as unknown) as Q,
        ])
      ),
    ])
  );
};

export const pascalCase = (filename: string) => {
  return filename
    .match(
      /[A-Z][a-z]+(?![a-z])|[A-Z]+(?![a-z])|([a-zA-Z\d]+(?=-))|[a-zA-Z\d]+(?=_)|[a-z]+(?=[A-Z])|[A-Za-z0-9]+/g
    )
    .map((s: string) => s[0].toUpperCase() + s.substring(1))
    .join("");
};

export const removeExtension = (filename: string) => {
  return filename.replace(/(?!^)\.[^.\s]+$/, "");
};

export const getFilename = (filepath: string) => {
  const pathParts = filepath.split("/");
  return pathParts[pathParts.length - 1];
};

export default (({
  universes,
  series,
  books,
}: Collection<Collection<PartiallyLinkedItem>>) => {
  const POSSIBILITIES: Possibilities = [
    { key: "books", from: books },
    { key: "book", from: books },
    { key: "series", from: series },
    { key: "serie", from: series },
    { key: "universes", from: universes },
    { key: "universe", from: universes },
    { key: "standAloneBooks", from: books },
  ];

  const getCollectionsToSearch = ((possibilities: Possibilities) => (
    targetKey: string
  ): Collection<PartiallyLinkedItem>[] => {
    const optSelection: Possibility | undefined = possibilities.find(
      ({ key }) => targetKey === key
    );

    if (optSelection === undefined) throw new Error("key isn't a possibility");

    const collectionToSearch = optSelection.from;

    return Array.isArray(collectionToSearch)
      ? collectionToSearch
      : [collectionToSearch];
  })(POSSIBILITIES);

  const shouldPopulate = (possibleKey: string) => {
    return POSSIBILITIES.some(({ key }) => possibleKey === key);
  };

  const replaceWithCorrespondingObject = (key: string) => ({
    parentType,
    parent,
  }: {
    parentType: string;
    parent: PartiallyLinkedItem;
  }) => (filepath: string): PartiallyLinkedItem => {
    const id = pascalCase(removeExtension(getFilename(filepath)));

    console.log(id, getCollectionsToSearch(key));

    for (const collection of getCollectionsToSearch(key)) {
      if (id in collection) {
        if (parentType in collection[id])
          collection[id][parentType].push(parent);
        else collection[id][parentType] = [parent];
        collection[id].id = id;
        return collection[id];
      }
    }

    throw new Error("corresponding object not found");
  };

  const populateObject = ({
    parentType,
    parent,
  }: {
    parentType: string;
    parent: PartiallyLinkedItem;
  }) => (obj: Collection<any>) => {
    for (const entry of Object.entries(obj)) {
      const [key, value] = entry;

      if (shouldPopulate(key)) {
        if (typeof value === "string") {
          obj[key] = replaceWithCorrespondingObject(key)({
            parentType,
            parent,
          })(value);
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "string"
        ) {
          obj[key] = value.map(replaceWithCorrespondingObject(key));
        }
      } else if (typeof value === "object") populateObject(value);
    }
  };

  const populateItem = (type: string) => (obj: PartiallyLinkedItem) => {
    for (const entry of Object.entries(obj)) {
      const [key, value] = entry;

      if (shouldPopulate(key)) {
        if (typeof value === "string") {
          obj[key] = replaceWithCorrespondingObject(key)({
            parentType: type,
            parent: obj,
          })(value);
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "string"
        ) {
          obj[key] = value.map(
            replaceWithCorrespondingObject(key)({
              parentType: type,
              parent: obj,
            })
          );
        }
      } else if (typeof value === "object")
        populateObject({ parentType: type, parent: obj })(value);
    }
  };

  const populateItemCollection = (type: string) => <After>(
    obj: Collection<PartiallyLinkedItem>
  ) => {
    Object.values(obj).forEach((value) => populateItem(type)(value));
    return (obj as unknown) as Collection<After>;
  };

  return {
    universes: populateItemCollection("universe")<Universe>(universes),
    series: populateItemCollection("series")<Series>(series),
    books: populateItemCollection("book")<Book>(books),
  };
})(
  injectIds<ForestryItem, PartiallyLinkedItem>({
    universes: universes,
    series: series,
    books: books,
  })
);
