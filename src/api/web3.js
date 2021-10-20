import Web3 from "web3";
import Web3Modal from "web3modal";
import NFT_CONTRACT_ABI from "./abi.json";

import WalletConnectProvider from "@walletconnect/web3-provider";

var provider;

const walletconnect = async function (setWallet) {
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
      network: "rinkeby",
      cacheProvider: false,
      providerOptions,
    });

    await web3Modal.clearCachedProvider();

    provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    setWallet(accounts[0]);
  } catch (err) {
    console.log(err);
  }
};

const mint = async function (
  walletId,
  amount,
  settransactionStatus,
  settransactionHash
) {
  try {
    const NFT_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
    const price = 1;

    const web3 = new Web3(provider);

    const nftContract = new web3.eth.Contract(
      NFT_CONTRACT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "700000" }
    );

    settransactionStatus("pendingApproval");

    const wei = (price * amount).toString() + "000000000000000";
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
  } catch (err) {
    console.log(err);
  }
};

const nftCollection = async function (walletId) {
  const NFT_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

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
