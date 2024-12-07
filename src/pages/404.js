import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>GoGoGM | 404</title>
        <meta name="description" content="Page not found. The requested page could not be located." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="px-6 py-10 lg:py-20 bg-orange-50 h-screen flex flex-wrap content-center">
        <div className="block justify-items-stretch mx-auto items-center text-center">
          <Image width={650} height={450} src="/404.svg" alt="Page Not Found" />
          <h2 className="font-bold font-serif text-2xl lg:text-4xl leading-6 mb-4 text-orange-700">
            Page Not Found!
          </h2>
          <p className="block text-center text-base font-sans text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-orange-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-orange-600 h-12 mt-6 text-sm lg:text-base w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
