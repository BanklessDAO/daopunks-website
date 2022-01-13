/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NFT() {
  const [nftId, setNftId] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [otherDAOPunks, setOtherDAOPunks] = useState(null);

  async function getNftId() {
    const url = window.location.pathname;
    const subDomains = url.split("/");
    const nftId = parseInt(Math.floor(subDomains[subDomains.length - 1]));
    if (typeof nftId === "number") {
      if (nftId > 0 && nftId < 1112) {
        setNftId(nftId);
      } else {
        setNftId(undefined);
      }
    } else {
      setNftId(undefined);
    }
  }

  async function getMetadata() {
    const ipfsMetadataURL =
      "https://ipfs.io/ipfs/QmRF2B8gotBTWidw34uwSyF9egEu88Jkhgviu6rrD1U6V6";
    const openseaBaseURL =
      "https://opensea.io/assets/0x700f045de43fce6d2c25df0288b41669b7566bbe";

    axios
      .get(`${ipfsMetadataURL}/${nftId}.json`)
      .then((res) => {
        const metadata = res.data;
        const nftImage = `https://daopunks.fra1.digitaloceanspaces.com/resized/${nftId}.png`;
        metadata.image = nftImage;
        metadata.imageLoaded = false;
        metadata.openseaURL = `${openseaBaseURL}/${nftId}`;
        setMetadata(metadata);

        getRedemptionStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getRedemptionStatus() {
    await axios
      .get(`${process.env.REACT_APP_MERCH_REDEEM_API_URL}/status/${nftId}`)
      .then((res) => {
        const redeemed =
          res.data.message === "NFT never redeemed." ? false : true;
        setMetadata((metadata) => ({
          ...metadata,
          redeemed: redeemed,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getOtherDAOPunks() {
    const otherDaoPunksMetadata = [];

    for (let i = 0; i < 4; i++) {
      const nftId = Math.floor(Math.random() * (1111 - 1 + 1) + 1);
      const nftURL = `/gallery/${nftId}`;
      const nftImage = `https://daopunks.fra1.digitaloceanspaces.com/resized/${nftId}.png`;

      otherDaoPunksMetadata.push({
        nftURL: nftURL,
        nftImage: nftImage,
      });
    }

    setOtherDAOPunks(otherDaoPunksMetadata);
  }

  useEffect(() => {
    if (!nftId) {
      getNftId();
    }
    if (nftId && !metadata) {
      getMetadata();
    }
    if (!otherDAOPunks) {
      getOtherDAOPunks();
    }
  });

  return (
    <div className="w-screen h-full flex flex-col items-center">
      {!metadata ? (
        <div className="h-full flex items-center justify-center">
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
      ) : (
        <>
          <div className="w-screen flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:px-5 max-w-screen-xl modius-bold">
            <div className="w-11/12 lg:w-full mt-20">
              <div
                style={{ aspectRatio: "1 / 1" }}
                className={`${
                  metadata && metadata.imageLoaded ? "hidden" : "block"
                } w-full rounded-xl animate-pulse bg-gray-200`}
              ></div>
              <img
                className={`${
                  metadata && metadata.imageLoaded ? "block" : "hidden"
                } w-full rounded-xl`}
                src={metadata ? metadata.image : ""}
                onLoad={() => setMetadata({ ...metadata, imageLoaded: true })}
              />
            </div>
            {metadata ? (
              <div className="w-full flex flex-col items-center lg:items-start lg:px-5">
                <h1 className="lg:mt-20 my-10 text-center text-3xl lg:text-5xl px-3 lg:px-0">
                  {metadata.name}
                </h1>
                <div className="px-5 lg:px-0">
                  <div>
                    <h2 className="text-lg">DESCRIPTION</h2>
                    <p
                      style={{
                        lineHeight: "20px",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                      className="open-sans-light text-lg mt-2"
                    >
                      {metadata.description}
                    </p>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-lg">PROPERTIES</h2>
                    <div className="lg:w-max mt-5 grid grid-cols-2 lg:grid-cols-3 content-start gap-x-3 gap-y-3">
                      {metadata && metadata.attributes
                        ? metadata.attributes.map((attr, key) => (
                            <div
                              key={key}
                              style={{
                                background: "rgba(228, 118, 27, 0.1)",
                                border: "1px solid rgba(228, 118, 27, 0.5)",
                              }}
                              className="w-full flex flex-col items-center justify-center gap-y-2 rounded p-3 lg:px-6 open-sans"
                            >
                              <h3 style={{ color: "rgba(228, 118, 27, 1)" }}>
                                {attr.trait_type}
                              </h3>
                              <p
                                style={{ color: "rgba(0, 0, 0, 0.6)" , maxWidth:'10rem' }}
                                className="w-max text-center text-sm"
                              >
                                {attr.value}
                              </p>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col lg:flex-row gap-y-5 gap-x-3">
                  <a
                    style={{ backgroundColor: "rgba(0, 133, 255, 0.5)" }}
                    className="px-auto w-72 h-14 rounded-lg text-white flex items-center justify-center"
                    href={metadata.openseaURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SEE ON OPENSEA
                  </a>
                  {metadata.redeemed === null ? (
                    <div className="w-72 h-14 bg-gray-300 rounded-lg animate-pulse"></div>
                  ) : (
                    <button
                      style={{ backgroundColor: "rgb(255, 0, 0)" }}
                      className="px-auto w-72 h-14 rounded-lg text-white"
                    >
                      {metadata.redeemed ? "REDEEMED" : "NOT REDEEMED"}
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-20 lg:mt-52 mb-20 lg:mb-52">
            <h2 className="text-5xl text-red modius-bold text-center">
              OTHER DAO PUNKS
            </h2>
            <div className="w-full mt-10 flex flex-col lg:flex-row items-center justify-center gap-y-5 lg:gap-x-5">
              {otherDAOPunks
                ? otherDAOPunks.map((otherDaoPunk, key) => (
                    <img
                      src={otherDaoPunk.nftImage}
                      className="w-11/12 lg:w-72 rounded-lg cursor-pointer"
                      onClick={() =>
                        (window.location.href = otherDaoPunk.nftURL)
                      }
                    />
                  ))
                : null}
            </div>
          </div>
          <div className="w-full py-9 bg-black text-white text-xl flex items-center justify-center">
            DAOPunks® - 2021
          </div>
        </>
      )}
    </div>
  );
}
