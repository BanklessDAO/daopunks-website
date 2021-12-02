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
        console.log(metadata)
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
    <div className="w-screen flex justify-center">
      <div className="w-max flex flex-col lg:flex-row items-center lg:items-start lg:justify-between modius-bold lg:px-5 max-w-screen-xl">
        <div className="w-11/12 lg:w-full">
          <img
            className="w-full mt-20 rounded-xl"
            src={metadata ? metadata.image : ""}
          />
          <div className="w-full"></div>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start lg:px-5">
          <h1 className="lg:mt-20 my-10 text-center text-3xl lg:text-5xl">
            {metadata !== null ? metadata.name : null}
          </h1>
          <div className="px-5 lg:px-0">
            <div>
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
              <div className="lg:w-max mt-5 grid grid-cols-2 lg:grid-cols-3 justify-items-start items-start gap-3">
                {metadata ? metadata.attributes.map((attr, key) => (
                  <div key={key} style={{
                    background: "rgba(228, 118, 27, 0.1)",
                    border: "1px solid rgba(228, 118, 27, 0.5)"
                  }} className="w-full lg:w-max flex flex-col items-center justify-center gap-y-2 rounded p-3 lg:px-5  open-sans">
                    <h3 style={{ color: "rgba(228, 118, 27, 1)" }}>{attr.trait_type}</h3>
                    <p style={{ color: "rgba(0, 0, 0, 0.6)" }} className="w-max text-center text-sm">
                      ANON
                      <br />
                      25% have this trait
                    </p>
                  </div>
                )) : null}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col lg:flex-row gap-y-5 gap-x-5">
            <a
              style={{ backgroundColor: "rgba(0, 133, 255, 0.5)" }}
              className="px-auto w-72 h-14 rounded-lg text-white flex items-center justify-center"
              href={nftId ? `https://daopunks.fra1.digitaloceanspaces.com/resized/${nftId}.png` : null}
              target="_blank"
              rel="noopener noreferrer"
            >
              SEE ON OPENSEA
            </a>
            <button
              style={{ backgroundColor: "rgb(255, 0, 0)" }}
              className="mb-20 px-auto w-72 h-14 rounded-lg text-white"
            >
              REDEEM TEE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
