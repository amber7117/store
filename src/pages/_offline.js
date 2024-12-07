import React from 'react';
import Head from 'next/head';

const Offline = () => {
  return (
    <>
      <Head>
        <title>GoGoGM | Your Gift Card Marketplace</title>
        <meta name="description" content="Access GoGoGM - Your trusted platform for buying and selling gift cards. Reconnect to explore amazing offers." />
      </Head>
      <div className="px-6 py-10 lg:py-20 bg-orange-50 h-screen flex flex-wrap content-center">
        <div className="block justify-items-stretch mx-auto items-center text-center">
          <h2 className="font-bold font-serif text-2xl lg:text-3xl leading-6 mb-4 text-orange-700">
            No Internet Connection Available!
          </h2>
          <p className="block text-center text-base font-sans text-gray-600">
            Please connect to the internet to access the live version of GoGoGM and explore amazing gift card offers.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </>
  );
};

export default Offline;
