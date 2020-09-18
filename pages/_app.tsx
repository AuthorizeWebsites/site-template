import "@styles/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppProps } from "next/app";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { AffiliateCodes } from "@components/AffiliateCodes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }
      `}</style>
      <AffiliateCodes
        mutations={[
          {
            hosts: ["uk", "jp", "ca", "de", "fr", "com"]
              .flatMap((frag) => [frag, `co.${frag}`])
              .map((frag) => `amazon.${frag}`)
              .flatMap((host) => [host, `www.${host}`]),
            urlParams: [["tag", "ABCD123"]],
          },
        ]}
      />
      <div className="flex flex-col min-h-full">
        <Header />
        <div className="relative flex flex-col flex-1">
          <Component {...pageProps} />
          <div className="flex-1 py-4 sm:py-8" />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MyApp;
