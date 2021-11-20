import React, { useState } from "react";
import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import { signMessage } from "../../../api/web3";
import axios from "axios";

export default function Redeem({ wallet, nftId }) {
  const [size, setSize] = useState(null);
  const [page, setPage] = useState(1);
  const [orderId, setOrderId] = useState(null);
  const [redemtionStatus, setRedemtionStatus] = useState(null);

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  async function shopifyRedirect() {
    const signature = await signMessage(wallet, `REDEEM:${nftId}:${size}`);

    axios
      .post(`${process.env.REACT_APP_MERCH_REDEEM_API_URL}/redeem`, {
        signature: signature,
        request: `REDEEM:${nftId}:${size}`,
        address: wallet,
      })
      .then((res) => {
        const handle = res.data.product.handle;
        window.open(
          `https://dao-punks.myshopify.com/products/${handle}`,
          "_blank"
        );
        setPage(3);
      });
  }

  async function confirmOrder() {
    const signature = await signMessage(wallet, `ORDER:${orderId}`);

    axios
      .post(`${process.env.REACT_APP_MERCH_REDEEM_API_URL}/confirm`, {
        signature: signature,
        request: `ORDER:${orderId}`,
        address: wallet,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.message === "Redemption confirmed successfully.") {
          setRedemtionStatus("sucessful");
        }
        if (res.data.error) {
          setRedemtionStatus("failed");
        }
      });
  }

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="absolute w-screen h-screen inset-0 flex items-center justify-center"
    >
      <div className="w-11/12 bg-white py-10 rounded-lg flex flex-col items-center">
        <h1 className="text-red text-2xl text-center">
          REDEEM <br className="sm:hidden" /> YOUR TEE
        </h1>

        <div className="mt-10 flex flex-col items-center">
          <div className="text-4xl"> {page} </div>
          <div
            style={{ maxWidth: "10rem" }}
            className="mt-1 leading-6 text-lg text-center"
          >
            {page === 1
              ? "SELECT SIZE"
              : page === 2
              ? "GO TO SHOPIFY"
              : "CONFIRMED ORDER"}
          </div>
        </div>
        {page === 1 ? (
          <div className="mt-10 grid grid-cols-3 gap-x-3 gap-y-3">
            {sizes.map((teeSize, key) => (
              <button
                key={key}
                onClick={() => setSize(teeSize)}
                className={`ibm-plex border border-black	px-6 py-2 rounded-full hover:text-white hover:bg-black ${
                  teeSize === size ? "bg-black text-white" : "bg-white"
                }`}
              >
                {teeSize}
              </button>
            ))}
          </div>
        ) : page === 2 ? (
          <button
            onClick={shopifyRedirect}
            className="mt-10 mb-5 px-5 py-3 rounded red text-white"
          >
            REDEEM TEE
          </button>
        ) : redemtionStatus === null ? (
          <div style={{ maxWidth: "15rem" }} className="mt-10 mb-5">
            <div className="absolute ml-3 -mt-2 px-2 bg-white text-sm">
              Order Id
            </div>
            <input
              type="text"
              value={orderId}
              className="w-full h-10 px-2 border border-black rounded outline-none"
              onInput={(e) => setOrderId(e.target.value)}
            />
            <button
              onClick={confirmOrder}
              className="w-full mt-2 rounded py-2 bg-black text-white"
            >
              SUMBIT
            </button>
          </div>
        ) : (
          <div className="mt-10 mb-5">
            {redemtionStatus === "sucessful" ? (
              <CheckCircleIcon className="text-green-400 h-16 w-16" />
            ) : (
              <XCircleIcon className="text-red-400 h-16 w-16" />
            )}
          </div>
        )}
        {redemtionStatus === null ? (
          <div className="w-full flex justify-center px-10 mt-5">
            <div
              style={{ maxWidth: "15.5rem" }}
              className="w-full flex justify-between"
            >
              <button
                onClick={() => (page !== 1 ? setPage(page - 1) : null)}
                className="border p-2 border-black rounded-full hover:bg-black hover:text-white"
              >
                <ArrowSmLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => (page !== 3 ? setPage(page + 1) : null)}
                className="border p-2 border-black rounded-full hover:bg-black hover:text-white"
              >
                <ArrowSmRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
