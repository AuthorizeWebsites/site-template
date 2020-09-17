import { homeData } from "@forestry/pages";
import {
  Hero as HeroSection,
  HeroProps as HeroSectionProps,
} from "@components/sections/Hero";
import {
  ShortBiography as ShortBiographySection,
  ShortBiographyProps as ShortBiographySectionProps,
} from "@components/sections/ShortBiography";
import {
  NewsletterSignUp as NewsletterSignUpSection,
  NewsletterSignUpProps as NewsletterSignUpSectionProps,
} from "@components/sections/NewsletterSignUp";
import {
  BookCarousel as BookCarouselSection,
  BookCarouselProps as BookCarouselSectionProps,
} from "@components/sections/BookCarousel";
import { useRouter } from "next/router";
import { useState } from "react";

export default function HomeMePage() {
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(true);

  return (
    <div>
      {homeData.sections.map(({ template, ...props }, index) => {
        switch (template) {
          case "hero-section":
            return (
              <HeroSection
                key={index}
                {...(props as HeroSectionProps)}
                isTopSection={index === 0}
              />
            );
          case "short-biography-section":
            return (
              <ShortBiographySection
                key={index}
                {...(props as ShortBiographySectionProps)}
              />
            );
          case "newsletter-sign-up-section":
            return (
              <NewsletterSignUpSection
                key={index}
                {...(props.customization as NewsletterSignUpSectionProps)}
              />
            );
          case "book-carousel-section":
            return (
              <BookCarouselSection
                key={index}
                {...(props as BookCarouselSectionProps)}
              />
            );
        }
      })}
      {"success" in router.query && showNotification && (
        <div className="fixed flex flex-col justify-between p-4 space-y-4 bg-green-500 rounded-md shadow-xl sm:flex-row bottom-2 inset-x-2 sm:space-y-0">
          <h1 className="text-green-900">You're all signed up!</h1>
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
            className="text-red-900 hover:text-black focus:outline-none focus:text-black"
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
  );
}
