import Web3 from "web3";
import Web3Modal from "web3modal";
import NFT_CONTRACT_ABI from "./abi.json";

import WalletConnectProvider from "@walletconnect/web3-provider";
import whitelist from "./whitelist.js";
var moment = require("moment-timezone");

const NFT_CONTRACT_ADDRESS = "0x700f045de43FcE6D2C25df0288b41669B7566BbE";
var provider;

const walletconnect = async function (
  setWallet,
  settransactionStatus,
  setNftSupply
) {
  var launchTime = moment.tz("2021-10-29 23:30", "Asia/Kolkata");

  if (
    process.env.REACT_APP_MINTING_ENABLED === "false" &&
    launchTime.diff(Date.now()) > 0
  ) {
    settransactionStatus("Coming Soon");
  } else {
    try {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "1ad4fe9fd37042e899c9a3b20f0df992", // required
          },
        },
      };

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        providerOptions,
      });

      await web3Modal.clearCachedProvider();

      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      checkNftSupply(setNftSupply);
      setWallet(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }
};

const mint = async function (
  walletId,
  amount,
  settransactionStatus,
  settransactionHash
) {
  var isPartOfWhitelist = false;

  for (var wallet in whitelist) {
    // eslint-disable-next-line
    if (walletId == whitelist[wallet]) {
      isPartOfWhitelist = true;
    }
  }

  try {
    const price = 80;

    const web3 = new Web3(provider);

    function getBankBalance() {
      return new Promise(async (res, rej) => {
        const MIN_ABI = [
          {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
          },
        ];
        const contract = new web3.eth.Contract(
          MIN_ABI,
          "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198"
        );
        const wallet = walletId;
        const result = await contract.methods.balanceOf(wallet).call();

        res(Number(Web3.utils.fromWei(result)));
      });
    }

    const balance = await getBankBalance();

    if (balance < 35000 && !isPartOfWhitelist) {
      settransactionStatus("Presale Requirements Not Met");
    } else {
      let baseGas = 700000;
      var gas = amount > 1 ? baseGas + 100000 * amount : 700000;

      const nftContract = new web3.eth.Contract(
        NFT_CONTRACT_ABI,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: gas }
      );
      settransactionStatus("pendingApproval");
      const wei = (price * Math.min(amount, 2)).toString() + "000000000000000";
      nftContract.methods
        .mintNFT()
        .send({ from: walletId, value: wei })
        .on("transactionHash", function (hash) {
          settransactionHash(hash);
          settransactionStatus("pending");
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          settransactionStatus("completed");
        })
        .on("error", function (error, receipt) {
          console.log("failed");
          if (error.code === 4001) {
            settransactionStatus(null);
          } else {
            settransactionStatus("failed");
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const checkNftSupply = async function (setNftSupply) {
  const web3 = new Web3(provider);

  const nftContract = new web3.eth.Contract(
    NFT_CONTRACT_ABI,
    NFT_CONTRACT_ADDRESS,
    { gasLimit: "700000" }
  );

  const supply = await nftContract.methods.totalSupply().call();

  // eslint-disable-next-line

  setNftSupply(supply);
};

const nftCollection = async function (walletId) {
  const web3 = new Web3(provider);

  const nftContract = new web3.eth.Contract(
    NFT_CONTRACT_ABI,
    NFT_CONTRACT_ADDRESS,
    { gasLimit: "700000" }
  );

  const supply = await nftContract.methods.totalSupply().call();
  console.log(supply);
  const result = await nftContract.methods.tokensOfOwner(walletId).call();
  for (var i in result) {
    const uri = await nftContract.methods.tokenURI(i).call();
    console.log(uri);
  }
};

export { walletconnect, mint, nftCollection };
