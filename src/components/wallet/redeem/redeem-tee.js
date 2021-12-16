import React, { useState, useEffect } from "react";
import axios from "axios";
import { signMessage } from "../../../api/web3";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function RedeemTee({ wallet, nftId, size, page, setPage }) {
  const [shopifyProductURL, setShopifyProductURL] = useState(null);

  useEffect(() => {}, [page, setPage, shopifyProductURL]);

  async function shopifyRedirect() {
    if (page === 2 && !shopifyProductURL) {
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
    } else if (page === 3 && !shopifyProductURL) {
      setPage(2);
    } else {
      window.open(shopifyProductURL, "_blank").focus();
      setPage(4);
    }
  }

  return (
    <>
      {page === 3 ? (
        <div style={{ maxWidth: "15rem" }} className="mt-8 text-center">
          Click below to place your order and return here to enter your order #
        </div>
      ) : null}

      {(page === 2 && !shopifyProductURL) || page === 3 ? (
        <button
          onClick={shopifyRedirect}
          className="mt-8 mb-5 px-5 py-3 rounded red text-white"
        >
          {!shopifyProductURL ? "SIGN MESSAGE" : "GO TO SHOPIFY"}
        </button>
      ) : (
        <CheckCircleIcon className="mt-8 mb-3 w-14 h-14 text-green-500" />
      )}
    </>
  );
}
