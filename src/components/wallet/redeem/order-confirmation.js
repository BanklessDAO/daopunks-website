import axios from "axios";
import { signMessage } from "../../../api/web3";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

export default function OrderConfirmation({
  redemtionStatus,
  orderId,
  setOrderId,
  wallet,
  setRedemtionStatus,
}) {
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

  return redemtionStatus === null ? (
    <div style={{ maxWidth: "15rem" }} className="mt-10 mb-5">
      <div className="absolute ml-3 -mt-2 px-2 bg-white text-sm">Order Id</div>
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
        SUBMIT
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
  );
}
