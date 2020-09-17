import Link from "next/link";

const formEndpoint = "/api/newsletter-sign-up";
const formMethod = "post";

export interface NewsletterSignUpProps {
  header: string;
  secondaryText: string;
}

export function NewsletterSignUp({
  header,
  secondaryText,
}: NewsletterSignUpProps) {
  return (
    <div className="px-4 mx-auto mt-4 max-w-7xl sm:mt-16">
      <div className="flex flex-col justify-between p-6 space-y-4 bg-gray-800 rounded-md shadow-2xl sm:p-12 md:items-start md:space-y-0 md:space-x-12 md:flex-row">
        <div className="flex-1 max-w-2xl space-y-2">
          <h1 className="text-3xl font-semibold leading-tight tracking-wider text-gray-300 sm:text-4xl">
            {header}
          </h1>
          <h2 className="leading-tight tracking-wider text-white font-base text-md sm:text-lg">
            {secondaryText}
          </h2>
        </div>
        <div className="w-full space-y-2 sm:max-w-sm">
          <form
            action={formEndpoint}
            method={formMethod}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <label className="flex-col w-full">
              <span className="sr-only">Your email</span>
              <input
                name="email"
                required
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
            <Link href="/privacy-policy">
              <a className="underline cursor-pointer">Privacy Policy</a>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
