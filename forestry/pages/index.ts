import collections, {
  getFilename,
  pascalCase,
  removeExtension,
  Book,
} from "@forestry/collections";
import rawHomeData from "./home.json";
import rawAboutMeData from "./about-me.json";

export const homeData = {
  sections: rawHomeData.sections.map((section) => {
    if ("books" in section) {
      return {
        ...section,
        books: section.books
          .map((bookFilepath) =>
            pascalCase(removeExtension(getFilename(bookFilepath)))
          )
          .map((key) => collections.books[key]),
      };
    } else return { ...section };
  }),
};

export const aboutMeData = rawAboutMeData;
