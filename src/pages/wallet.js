import React, { useState, useEffect } from "react";

import Header from "../components/global/header";
import BackgroundImage from "../assets/images/backgrounds/team-background.png";

import { walletconnect, nftCollection } from "../api/web3";
import Redeem from "../components/wallet/redeem/index";
import NFT from "../components/wallet/nft";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [redeem, setRedeem] = useState(null);
  const [isHydrated, hydrate] = useState(false);

  useEffect(() => {
    if (wallet !== null && !isHydrated) {
      nftCollection(wallet, setNfts, hydrate);
    }
  }, [wallet, setNfts, isHydrated, hydrate]);

  return (
    <div className={`h-screen flex flex-col`}>
      <div
        className="pb-8 sm:pb-0"
        style={{
          background: `url('${BackgroundImage}')`,
          backgroundSize: "cover",
        }}
      >
        <Header />
      </div>

      {wallet === null ? (
        <div className="w-screen h-full flex items-center justify-center">
          <button
            className="modius-bold p-5 text-white red rounded-lg"
            onClick={() => walletconnect(setWallet, null)}
          >
            CONNECT WALLET
          </button>
        </div>
      ) : (
        <div className="mt-10 w-full h-full flex flex-col items-center modius-bold">
          <div className="text-red text-4xl sm:text-5xl md:text-6xl md:py-12 text-center">
            YOUR DAO PUNKS
          </div>

          {nfts === null && !isHydrated ? (
            <div className="-mt-20 w-screen h-full flex items-center justify-center">
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
              {redeem !== null ? (
                <Redeem wallet={wallet} setRedeem={setRedeem} nftId={redeem} />
              ) : null}
              {nfts !== null && nfts.length !== 0 ? (
                <NFT nfts={nfts} setRedeem={setRedeem} />
              ) : (
                <div className="-mt-20 w-screen h-full flex items-center justify-center text-2xl">
                  NO NFT's FOUND
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
