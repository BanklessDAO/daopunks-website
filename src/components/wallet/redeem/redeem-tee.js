import React, { useState } from "react";
import axios from "axios";
import { signMessage } from "../../../api/web3";

export default function RedeemTee({
  redemtionStatus,
  wallet,
  nftId,
  size,
  setRedemtionStatus,
  setPage,
}) {
  const [shopifyProductURL, setShopifyProductURL] = useState(null);

  async function shopifyRedirect() {
    if (!shopifyProductURL) {
      const signature = await signMessage(wallet, `REDEEM:${nftId}:${size}`);

      axios
        .post(`${process.env.REACT_APP_MERCH_REDEEM_API_URL}/redeem`, {
          signature: signature,
          request: `REDEEM:${nftId}:${size}`,
          address: wallet,
        })
        .then((res) => {
          const handle = res.data.product.handle;
          setShopifyProductURL(
            `https://dao-punks.myshopify.com/products/${handle}`
          );
        });
    } else {
      window.open(shopifyProductURL, "_blank").focus();
      setPage(3);
    }
  }

  return (
    <button
      onClick={shopifyRedirect}
      className="mt-10 mb-5 px-5 py-3 rounded red text-white"
      href={shopifyProductURL ? shopifyProductURL : null}
    >
      {!shopifyProductURL ? "REDEEM TEE" : "PLACE ORDER"}
    </button>
  );
}
