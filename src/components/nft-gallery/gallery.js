/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";

import { SearchIcon } from "@heroicons/react/solid";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [nfts, setNfts] = useState(null);

  console.log(nfts);

  useEffect(() => {
    getNFTs();
  }, [query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getNFTs() {
    console.log("getNFTs");
    let executeQuery = false;

    if (query.length > 0) {
      const nftId = parseInt(query);
      if (!isNaN(nftId)) {
        if (nftId > 0 && nftId < 1112) {
          executeQuery = true;
        }
      }
    }

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

      <div className="flex gap-x-2">
        <div className="relative">
          <div className="absolute ml-3 -mt-2 px-2 bg-white text-sm">CODE</div>
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
        <button className="w-10 h-10 bg-black rounded flex items-center justify-center">
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {nfts ? (
        <div className="mt-20 pb-10 w-full px-10 grid grid-cols-4 gap-3">
          {nfts.map((nft, key) => (
            <a key={key} href={`/gallery/${nft.nftId}`}>
              <img src={nft.nftImageURL} alt="" className="w-full rounded-lg" />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
