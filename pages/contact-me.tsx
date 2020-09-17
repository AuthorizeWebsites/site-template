import { useRouter } from "next/router";
import { useState } from "react";

const formEndpoint = "/api/contact-me";
const formMethod = "post";

export default function ContactMePage() {
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(true);

  return (
    <>
      <div className="flex-1" />
      <div className="w-full max-w-xl p-4 mx-auto">
        <form
          className="flex flex-col w-full p-4 space-y-4 bg-gray-800 rounded-md shadow-xl"
          method={formMethod}
          action={formEndpoint}
        >
          <h1 className="text-3xl font-semibold leading-tight tracking-wider text-white uppercase">
            Let's talk
          </h1>
          <input
            className="border-none rounded-md form-input"
            type="email"
            required
            aria-label="your email"
            placeholder="Your email..."
          />
          <textarea
            required
            className="border-none rounded-md form-textarea h-96"
            aria-label="your message"
            placeholder="Your message..."
          />
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-3 py-3 font-medium leading-4 text-gray-900 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
            >
              Submit
            </button>
          </span>
        </form>
        {"success" in router.query && showNotification && (
          <div className="fixed flex flex-col justify-between p-4 space-y-4 bg-green-500 rounded-md shadow-xl sm:flex-row bottom-2 inset-x-2 sm:space-y-0">
            <h1 className="text-green-900">
              Your message was successfully sent!
            </h1>
            <button
              onClick={() => setShowNotification(false)}
              className="text-green-900 hover:text-black focus:text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
        {"failure" in router.query && showNotification && (
          <div className="fixed flex flex-col justify-between p-4 space-y-4 bg-red-500 rounded-md shadow-xl bottom-2 inset-x-2 sm:flex-row sm:space-y-0">
            <h1 className="text-red-900">
              Something went wrong. Sorry about that. Please email support,{" "}
              <a
                href="mailto:support@authorizewebsites.com"
                className="underline"
              >
                support@authorizewebsites.com
              </a>
              , so we can fix this ASAP.
            </h1>
            <button
              onClick={() => setShowNotification(false)}
              className="text-red-900 hover:text-black focus:text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
