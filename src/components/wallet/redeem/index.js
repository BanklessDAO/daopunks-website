import React, { useState } from "react";
import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  ExternalLinkIcon,
} from "@heroicons/react/solid";

import { XCircleIcon as XCircle } from "@heroicons/react/outline";

import Size from "./size";
import RedeemTee from "./redeem-tee";
import OrderConfirmation from "./order-confirmation";

export default function Redeem({ wallet, nftId, setRedeem }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [redemtionStatus, setRedemtionStatus] = useState(null);

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="absolute w-screen h-screen inset-0 flex items-center justify-center"
    >
      <div className="relative w-11/12 md:w-max md:px-16 bg-white py-10 rounded-lg flex flex-col items-center">
        <button
          onClick={() => setRedeem(null)}
          className="absolute top-5 right-5"
        >
          <XCircle className="w-8 h-8" />
        </button>

        <h1 className="text-red text-2xl md:text-3xl text-center">
          REDEEM <br className="" /> YOUR TEE
        </h1>

        <div className="mt-10 flex flex-col items-center">
          <div className="text-4xl"> STEP {page} </div>
          <div
            // style={{ maxWidth: "10rem" }}
            className="mt-1 leading-6 text-lg text-center"
          >
            {page === 1
              ? "SELECT SIZE"
              : page === 2
              ? "SIGN MESSAGE"
              : page === 3
              ? "GO TO SHOPIFY"
              : "CONFIRMED ORDER"}
          </div>
          {page === 1 ? (
            <a
              href="https://media.discordapp.net/attachments/902231880575877121/917964691672793109/size_chart_dpx.jpg"
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex text-indigo-600"
            >
              Size Chart
              <ExternalLinkIcon className="ml-1 mt-0.0 w-5  h-5" />
            </a>
          ) : null}
        </div>
        {page === 1 ? (
          <Size size={size} setSize={setSize} />
        ) : page === 2 || page === 3 ? (
          <RedeemTee
            redemtionStatus={redemtionStatus}
            wallet={wallet}
            nftId={nftId}
            size={size}
            setRedemtionStatus={setRedemtionStatus}
            page={page}
            setPage={setPage}
          />
        ) : (
          <OrderConfirmation
            redemtionStatus={redemtionStatus}
            orderId={orderId}
            setOrderId={setOrderId}
            wallet={wallet}
            setRedemtionStatus={setRedemtionStatus}
          />
        )}
        {redemtionStatus === null ? (
          <div className="w-full flex justify-center px-10 md:px-0 mt-5">
            <div
              style={{ maxWidth: "15.5rem" }}
              className="w-full flex justify-between"
            >
              {page !== 1 ? (
                <button
                  onClick={() =>
                    page !== 1
                      ? page !== 4
                        ? setPage(page - 1)
                        : setPage(2)
                      : null
                  }
                  className="flex p-2 rounded-full"
                >
                  <ArrowSmLeftIcon className="h-6 w-6" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              {page !== 4 ? (
                <button
                  onClick={() =>
                    page !== 3
                      ? page !== 2
                        ? setPage(page + 1)
                        : setPage(4)
                      : null
                  }
                  className="flex p-2 rounded-full"
                >
                  Next
                  <ArrowSmRightIcon className="h-6 w-6" />
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
