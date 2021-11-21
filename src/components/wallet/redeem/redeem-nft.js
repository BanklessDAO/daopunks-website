import React from "react";

export default function RedeemNFT({ nfts, setRedeem }) {
    return (
      <div className="w-11/12 max-w-7xl my-10 grid lg:grid-cols-3 gap-y-10 lg:gap-x-10">
        {nfts && nfts.map((nft, key) => { return (
          <div key={key}>
            <img className="w-full rounded-lg" src={nft.image} alt="" />
            <button
              onClick={() => {
                if (!nft.redeemed) {
                  setRedeem(nft.nftId);
                }
              }}
              className={`w-full ${
                nft.redeemed ? "bg-black" : "red"
              } mt-3 py-5 rounded-lg text-xl text-white`}
            >
              {!nft.redeemed ? "REDEEM TEE" : "TEE REDEEMED"}
            </button>
          </div>
        )})}
      </div>
    );
}