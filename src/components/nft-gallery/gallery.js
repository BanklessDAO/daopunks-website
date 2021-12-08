/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";

import { SearchIcon } from "@heroicons/react/solid";
// import VisibilitySensor from "react-visibility-sensor";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    try {
      getNFTs();
    } catch {
      console.log("error occured");
    }
  }, [query]);

  async function getNFTs() {
    let executeQuery = false;
    if (query.length > 0) {
      const nftId = parseInt(query);
      if (!isNaN(nftId)) {
        if (nftId > 0 && nftId < 1112) {
          executeQuery = true;
        }
      }
    }

    console.log(executeQuery);

    if (executeQuery) {
      setNfts([
        {
          nftId: query,
          nftImageURL: `https://daopunks.fra1.digitaloceanspaces.com/resized/${query}.png`,
        },
      ]);
    } else {
      const nftArray = nfts === null ? [] : nfts;

      for (let i = 0; i < 12; i++) {
        const nftId = Math.floor(Math.random() * (1111 - 1 + 1) + 1);

        nftArray.push({
          nftId: nftId,
          nftImageURL: `https://daopunks.fra1.digitaloceanspaces.com/resized/${nftId}.png`,
        });
      }

      setNfts(nftArray);
    }
  }

  return (
    <div className="mt-10 w-full h-full flex flex-col items-center modius-bold">
      <div className="text-red text-4xl sm:text-5xl md:text-6xl md:py-12 text-center">
        ALL DAO PUNKS
      </div>

      <div className="mt-10 gap-x-2">
        <div className="w-full px-5 relative flex items-center justify-center">
          <div className="absolute -top-2 left-8 px-1 bg-white text-sm">
            NFT ID
          </div>
          <input
            type="number"
            placeholder="592"
            value={query}
            className="w-full h-10 px-2 border border-black rounded outline-none  placeholder-gray-200"
            onInput={(e) => {
              let value = e.target.value;
              setQuery(value);
            }}
          />
        </div>
      </div>

      {nfts ? (
        <div className="mt-10 lg:mt-20 pb-10 w-full px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-4 gap-3">
          {nfts.map((nft, key) => (
            <a key={nft.nftId} href={`/gallery/${nft.nftId}`}>
              <img src={nft.nftImageURL} alt="" className="w-full rounded-lg" />
            </a>
          ))}
        </div>
      ) : null}

      {/* <VisibilitySensor>
        {({ isVisible }) => {
          // if (nfts !== null && isVisible) {
          //   getNFTs();
          // }

          return (
            <div
              onClick={() => getNFTs()}
              className="w-full py-10 flex items-center justify-center"
            >
              <svg
                className="w-max h-max animate-spin -ml-1 mr-3 h-8 w-8 text-red"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          );
        }}
      </VisibilitySensor> */}
    </div>
  );
}
