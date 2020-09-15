import data from "@forestry/pages/home.json";
import Link from "next/link";

interface HeroSectionProps {
  background: string;
  primaryText: string;
  secondaryText: string;
  isTopSection: boolean;
}

function HeroSection({
  background,
  primaryText,
  secondaryText,
  isTopSection,
}: HeroSectionProps) {
  return (
    <div
      className={`${
        isTopSection ? "" : "sm:mt-16 mt-4"
      } relative flex items-center justify-center px-4 py-48 mt-4 bg-black sm:mt-16 sm:py-64`}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img src={background} className="object-cover min-h-full opacity-50" />
      </div>
      <div className="z-10 flex flex-col items-center max-w-4xl">
        {primaryText && (
          <h1 className="text-5xl font-semibold leading-tight tracking-wider text-center text-gray-300">
            {primaryText}
          </h1>
        )}
        {secondaryText && (
          <h2 className="text-4xl font-semibold leading-tight tracking-wider text-center text-white">
            {secondaryText}
          </h2>
        )}
      </div>
    </div>
  );
}

interface ShortBiographySectionProps {
  header: string;
  showReadMoreButton: boolean;
  biography: string;
  isTopSection: boolean;
}

function ShortBiographySection({
  header,
  showReadMoreButton,
  biography,
}: ShortBiographySectionProps) {
  return (
    <div className="flex flex-col w-full px-4 mx-auto mt-4 max-w-7xl sm:pl-12 sm:pr-4 sm:mt-16">
      <div className="z-10 self-center px-4 py-3 -mb-8 bg-gray-800 border border-gray-900 rounded-md shadow-lg sm:self-start sm:-ml-8">
        <h1 className="text-4xl font-semibold leading-tight tracking-wider text-white">
          {header}
        </h1>
      </div>
      <div className="px-6 pt-12 pb-6 space-y-6 bg-white border border-gray-100 rounded-md shadow-xl">
        <div
          className="space-y-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: biography }}
        />
        {showReadMoreButton && (
          <Link href="/about-me">
            <a className="inline-block px-4 py-2 text-xl font-semibold tracking-wider text-white bg-gray-800 rounded-md shadow-lg focus:shadow-outline-blue focus:outline-none hover:bg-gray-700">
              Read More
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

interface NewsletterSignUpSectionProps {
  header: string;
  secondaryText: string;
  isTopSection: boolean;
}

function NewsletterSignUpSection({
  header,
  secondaryText,
}: NewsletterSignUpSectionProps) {
  return (
    <div className="px-4 mx-auto mt-4 max-w-7xl sm:mt-16">
      <div className="flex flex-col justify-between p-12 space-y-4 bg-gray-800 rounded-md shadow-2xl md:items-start md:space-y-0 md:space-x-12 md:flex-row">
        <div className="flex-1 max-w-xl space-y-2">
          <h1 className="text-3xl font-semibold leading-tight tracking-wider text-gray-300 sm:text-4xl">
            {header}
          </h1>
          <h2 className="leading-tight tracking-wider text-white font-base text-md sm:text-lg">
            {secondaryText}
          </h2>
        </div>
        <div className="w-full space-y-2 sm:max-w-sm">
          <form
            action="POST"
            method="/api/newsletter-sign-up"
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <label className="flex-col w-full">
              <span className="sr-only">Your email</span>
              <input
                name="email"
                placeholder="Enter your email"
                type="email"
                className="w-full border-none rounded-md form-input"
              />
            </label>
            <span className="inline-flex self-stretch rounded-md shadow-sm sm:self-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-3 py-3 font-medium leading-4 text-gray-900 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
              >
                Submit
              </button>
            </span>
          </form>
          <p className="text-sm font-light tracking-wider text-gray-300">
            I care about the protection of your data. Read my{" "}
            <a className="underline cursor-pointer">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomeMePage() {
  return (
    <div className="/space-y-4 /sm:space-y-16">
      {data.sections.map(({ template, ...props }, index) => {
        switch (template) {
          case "hero-section":
            return <HeroSection {...(props as HeroSectionProps)} />;
          case "short-biography-section":
            return (
              <ShortBiographySection
                {...(props as ShortBiographySectionProps)}
              />
            );
          case "newsletter-sign-up-section":
            return (
              <NewsletterSignUpSection
                {...(props.customization as NewsletterSignUpSectionProps)}
              />
            );
        }
      })}
    </div>
  );
}
