/* eslint-disable react/jsx-no-target-blank */
export default function TransactionStatus({
  transactionStatus,
  transactionHash,
  wallet,
  nftAmount,
}) {
  return (
    <>
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.5)", filter: "blur(24px)" }}
        className="absolute w-screen h-screen bg-black flex items-center justify-center"
      ></div>

      <div className="absolute flex items-center justify-center">
        <div
          className={`w-11/12 sm:max-w-sm md:w-max md:max-w-md xl:max-w-2xl xl:py-10 ${
            transactionStatus === "pendingApproval" ||
            transactionStatus === "pending"
              ? "bg-white"
              : "red"
          } rounded-lg py-8`}
        >
          <div
            className={`modius-bold text-center ${
              transactionStatus === "pendingApproval" ||
              transactionStatus === "pending"
                ? "text-red text-2xl md:text-4xl xl:text-5xl"
                : "text-white text-3xl md:4xl xl:text-5xl"
            } px-2 sm:px-5`}
          >
            {transactionStatus === "pendingApproval"
              ? "PLEASE CONFIRM THE TRANSACTION"
              : transactionStatus === "pending"
              ? "YOUR TRANSACTION IS PENDING"
              : transactionStatus === "completed"? "MINTING SUCESSFUL!" : "MINTING FAILED"}
          </div>

          <div
            className={`${
              transactionStatus === "pendingApproval" ||
              transactionStatus === "pending"
                ? "text-black"
                : "text-white text-base hover:underline cursor-pointer"
            } text-center break-all ibm-plex-bold px-6 pt-5 xl:pt-16 xl:pb-5 md:text-lg xl:text-2xl`}
          >
            {transactionStatus === "pendingApproval" ? (
              nftAmount > 1 ? (
                `${nftAmount} NFTs  —  ${nftAmount * 0.1} ETH`
              ) : (
                `${nftAmount} NFT  —  ${nftAmount * 0.1} ETH`
              )
            ) : (
              <a
                href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
                target="_blank"
                className="flex items-center justify-center cursor-pointer hover:underline mt-8 mb-2"
              >
                View on Etherscan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(45deg)" }}
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
