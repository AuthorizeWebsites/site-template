import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { Book } from "@forestry/collections";

export interface BookCarouselProps {
  books: Book[];
  advancedSettings: {
    autoplay: boolean;
    infiniteLoop: boolean;
    slideDelay: number;
  };
}

export function BookCarousel({ books, advancedSettings }: BookCarouselProps) {
  return (
    <div className="px-4 mx-auto mt-4 max-w-7xl sm:mt-16">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={true}
        autoPlay={advancedSettings.autoplay}
        infiniteLoop={advancedSettings.infiniteLoop}
        swipeable={true}
        interval={advancedSettings.slideDelay}
        className="min-h-full overflow-hidden rounded-md shadow-xl"
      >
        {books.map((book) => (
          <div
            key={book.title}
            className="relative flex items-center justify-center min-h-full px-6 py-4 sm:px-10 sm:py-16"
          >
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black shadow-inner"
              style={{ minHeight: "120%" }}
            >
              <img
                src={book.cover}
                className="absolute inset-0 object-top min-w-full min-h-full transform scale-150 opacity-75"
                style={{
                  filter: "blur(35px)",
                }}
              />
            </div>
            <div className="z-10 flex flex-col items-center justify-center p-4 space-y-4 bg-white rounded-md shadow-lg md:w-auto sm:p-8 md:space-y-0 md:space-x-8 md:flex-row">
              <Link href="/books/[id]" as={`/books/${book.id}`}>
                <a className="flex-shrink-0 block transition-all duration-300 ease-in-out transform hover:scale-105 ">
                  <img
                    key={book.title}
                    src={book.cover}
                    className="z-10 w-full h-auto rounded-md shadow-lg sm:w-auto sm:h-96"
                    style={{ width: "auto" }}
                  />
                </a>
              </Link>
              {book.description && (
                <div className="z-10 self-stretch hidden max-h-full overflow-y-hidden break-words sm:break-normal sm:block">
                  <div className="flex flex-col items-start self-stretch justify-start max-w-3xl">
                    <h1 className="text-3xl font-semibold leading-tight tracking-wider text-left text-gray-700">
                      {book.title}
                    </h1>
                    <div className="relative h-80">
                      <div
                        className="max-w-full pb-16 overflow-y-auto prose text-left sm:prose-lg max-h-80 overscroll-y-contain"
                        dangerouslySetInnerHTML={{ __html: book.description }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
