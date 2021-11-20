import React, { useState, useEffect } from "react";

import Header from "../components/global/header";
import BackgroundImage from "../assets/images/backgrounds/team-background.png";

import { walletconnect, nftCollection } from "../api/web3";
import Redeem from "../components/wallet/redeem/redeem";
import RedeemNFT from "../components/wallet/redeem/redeem-nft";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [redeem, setRedeem] = useState(null);

  useEffect(() => {
    if (wallet !== null) {
      nftCollection(wallet, setNfts);
    }
  }, [wallet]);

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
        <div className="mt-10 w-full flex flex-col items-center modius-bold">
          <div className="text-red text-4xl sm:text-5xl md:text-6xl md:py-12 text-center">
            YOUR DAO PUNKS
          </div>

          {nfts === null ? (
            <div className="h-full flex items-center justify-center">
              Loading...
            </div>
          ) : (
            <>
              {redeem !== null ? (
                <Redeem wallet={wallet} redeem={redeem} nftId={redeem} />
              ) : null}
              <RedeemNFT nfts={nfts} setRedeem={setRedeem} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
