/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BackgroundImage from "../../../assets/images/backgrounds/mint-background.png";

import { walletconnect, mint, nftCollection } from "../../../api/web3";

import TransactionStatus from "./transaction-status";

function MintNFT({ wallet, setWallet, isSoldOut, setIsSoldOut }) {
  const [nftAmount, setnftAmount] = useState(1);
  const [transactionStatus, settransactionStatus] = useState(null);
  const [transactionHash, settransactionHash] = useState(null);

  useEffect(() => {
    (async () => {
      // Code to check if NFT's are soldout
      // If soldout - setIsSoldOut(true);
    })();
  }, [setIsSoldOut]);

  return (
    <>
      {transactionStatus !== null ? (
        <TransactionStatus
          transactionStatus={transactionStatus}
          transactionHash={transactionHash}
          wallet={wallet}
          nftAmount={nftAmount}
        />
      ) : null}

      {wallet === null && !isSoldOut ? (
        <button
          onClick={() => walletconnect(setWallet)}
          className="mt-16 sm:mt-28 px-3 sm:px-10 mx-5 py-5 rounded bg-white modius-bold text-base sm:text-xl leading-snug text-black outline-none"
        >
          CONNECT YOUR WALLET
        </button>
      ) : !isSoldOut ? (
        <div className="flex flex-col items-center">
          <input
            value={nftAmount}
            type="number"
            className="w-60 sm:w-80 mx-20 mt-28 pl-5 pr-3 sm:pl-10 py-5 rounded modius-bold text-base sm:text-xl leading-snug text-black outline-none"
            onInput={(e) => setnftAmount(e.target.value)}
          />
          <button
            onClick={() =>
              mint(wallet, nftAmount, settransactionStatus, settransactionHash)
            }
            className="w-max mt-3 px-3 sm:px-7 mx-5 py-5 rounded red text-white modius-bold text-base sm:text-xl leading-snug text-black outline-none"
          >
            MINT A DAOPUNK
          </button>
        </div>
      ) : (
        <div className="mt-20 sm:mt-32 mb-10 text-red white-text-shadow text-7xl sm:text-8xl text-center lg:text-9xl violence">
          SOLD OUT
        </div>
      )}
    </>
  );
}

export default function Mint() {
  const [wallet, setWallet] = useState(null);
  const [isSoldOut, setIsSoldOut] = useState(false);

  return (
    <div
      id="mint"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      className="w-screen h-screen bg-cover flex flex-col items-center justify-center"
    >
      <h1 className="max-w-4xl px-3 sm:px-10 text-white text-4xl sm:text-5xl lg:text-7xl leading-normal md:leading-snug lg:leading-snug modius-bold red-text-shadow text-center">
        BE A PIONEER. BLAZE TRAILS WITH US
      </h1>

      <MintNFT
        wallet={wallet}
        setWallet={setWallet}
        isSoldOut={isSoldOut}
        setIsSoldOut={setIsSoldOut}
      />
    </div>
  );
}
