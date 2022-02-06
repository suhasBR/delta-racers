import { store } from "../store";
import { walletLogin, setLoading, unsetLoading, loadNFTs } from "../reducers/user";


// Polygon Mumbai testnet details
const networks ={
  polygon: {
    chainId : `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name : "MATIC",
      symbol: "MATIC",
      decimals : 18
    },
    rpcUrls: ["https://rpc-mumbai.matic.today/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
  }
}

export const connectWallet = async () => {
  if (window.ethereum) {
      //set loading to initiate loader
    store.dispatch(setLoading());
    try {
      //change network to Polygon Mumbai
     const sw =  await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params : [
          {
            ...networks['polygon']
          }
        ]
      })


      //connect wallet
      const result = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(result);
      store.dispatch(walletLogin(result[0]));
    } catch (error) {
      console.log(error.message);
      //unset loader since error encountered
      store.dispatch(unsetLoading());
    }
  } else {
    alert("Need to install Metamask !");
  }
};


export const updateNFTs = async (nftArray) =>  {
  store.dispatch(loadNFTs(nftArray));
}; 
