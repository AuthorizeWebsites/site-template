import "@styles/index.css";
import { AppProps } from "next/app";
import { Header } from "@components/Header";
import Link from "next/link";
import { Footer } from "@components/Footer";

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
      <div className="flex flex-col min-h-full">
        <Header />
        <div className="flex flex-col flex-1">
          <Component {...pageProps} />
          <div className="flex-1" />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MyApp;
