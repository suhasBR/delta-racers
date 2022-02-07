const ethers = require("ethers");

//backend needs RPC provider - alchemy use third party 
const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/vuNgr1EwLOouQ2fYrWBS-J59_rYp0Wez")
const privateKey = '<PRIVATE_KEY>';

const signer = new ethers.Wallet(privateKey, provider);

const address = "0xe9F3F9008ec5E3102d5eB4D0a040bc31e7FF113F";

const myAbi = require('./abi.json');
const { latestPrices } = require('./prices')



const myContract_write = new ethers.Contract(address, myAbi, signer);
const myContract_read = new ethers.Contract(address, myAbi, provider);


myContract_write.endRace([
    41700783, 2999401,
        1000,  414037,
        1128,  112979,
         673,   54587,
         152,   21295
  ]).then((result) => {
    console.log(result);
})