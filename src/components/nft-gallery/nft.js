/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function NFT() {
  const [nftId, setNftId] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const ipfsMetadataURL =
    "https://ipfs.io/ipfs/QmRF2B8gotBTWidw34uwSyF9egEu88Jkhgviu6rrD1U6V6";
  const openSeaNFTURL =
    "https://opensea.io/assets/0x7042388312e7de670d1975431672915ff3e549cf";

  async function getNftId() {
    const url = window.location.pathname;
    const subDomains = url.split("/");
    const nftId = parseInt(Math.floor(subDomains[subDomains.length - 1]));
    if (typeof nftId === "number") {
      if (nftId > 0 && nftId < 1112) {
        console.log(nftId);
        setNftId(nftId);
      } else {
        setNftId(undefined);
      }
    } else {
      setNftId(undefined);
    }
  }

  async function getMetadata() {
    axios
      .get(`${ipfsMetadataURL}/${nftId}.json`)
      .then((res) => {
        const metadata = res.data;
        const nftImage = `https://ipfs.io/ipfs/${metadata.image.slice(7)}`;
        metadata.image = nftImage;
        setMetadata(metadata);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!nftId) {
      getNftId();
    }
    if (nftId && !metadata) {
      getMetadata();
    }
  });

  return (
    <div className="w-screen flex flex-col items-center modius-bold">
      <img
        className="w-11/12 mt-20 rounded-lg"
        src={metadata ? metadata.image : ""}
      />
      <h1 className="my-10 text-center text-3xl">
        {metadata !== null ? metadata.name : null}
      </h1>
      <div className="px-5">
        <div className="">
          <h2 className="text-lg">DESCRIPTION</h2>
          <p
            style={{ lineHeight: "20px", color: "rgba(0, 0, 0, 0.6)" }}
            className="open-sans-light text-lg mt-2"
          >
            {metadata !== null ? metadata.description : null}
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-lg">PROPERTIES</h2>
          <div className="mt-5"></div>
        </div>
      </div>
      <a
        style={{ backgroundColor: "rgba(0, 133, 255, 0.5)" }}
        className="px-auto w-72 h-14 rounded-lg text-white flex items-center justify-center"
        href={nftId ? `${openSeaNFTURL}/${nftId}` : null}
        target="_blank"
        rel="noopener noreferrer"
      >
        SEE ON OPENSEA
      </a>
      <button
        style={{ backgroundColor: "rgb(255, 0, 0)" }}
        className="my-5 px-auto w-72 h-14 rounded-lg text-white"
      >
        REDEEM TEE
      </button>
    </div>
  );
}
