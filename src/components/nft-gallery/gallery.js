/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [nfts, setNfts] = useState(null);
  const [isHydrated, hydrate] = useState(false);

  useEffect(() => {
    try {
      getNFTs();
    } catch {
      console.log("error occured");
    }
  }, [query]);

  async function getNFTs() {
    console.log("getting nfts");
    hydrate(false);

    if (query && query === "") {
      setQuery(null);
    }

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

    if (executeQuery && query !== "") {
      setNfts([
        {
          nftId: query,
          nftImageURL: `https://daopunks.fra1.digitaloceanspaces.com/resized/${query}.png`,
        },
      ]);
      hydrate(true);
    } else {
      const nftArray = nfts === null ? [] : nfts;

      for (let i = 0; i < 4 * 5; i++) {
        const nftId = Math.floor(Math.random() * (1111 - 1 + 1) + 1);

        nftArray.push({
          nftId: `${nftId}`,
          nftImageURL: `https://daopunks.fra1.digitaloceanspaces.com/resized/${nftId}.png`,
        });

        console.log(nftArray);
      }

      if (nftArray && nftArray.length > 0) {
        await setNfts(nftArray);
        hydrate(true);
      }
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

      {nfts && isHydrated ? (
        <div className="mt-10 lg:mt-20 pb-10 w-full px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-4 gap-3">
          {nfts.map((nft, key) => (
            <a key={nft.nftId} href={`/gallery/${nft.nftId}`}>
              <img src={nft.nftImageURL} alt="" className="w-full rounded-lg" />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
