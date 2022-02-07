const ethers = require("ethers");

//backend needs RPC provider - alchemy use third party 
const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/vuNgr1EwLOouQ2fYrWBS-J59_rYp0Wez")
const privateKey = '<PRIVATE_KEY>';

const signer = new ethers.Wallet(privateKey,provider);

const address = "0xe9F3F9008ec5E3102d5eB4D0a040bc31e7FF113F";

const myAbi = require('./abi.json');



const myContract_write = new ethers.Contract(address,myAbi,signer);
const myContract_read = new ethers.Contract(address,myAbi,provider);



myContract_write.getBalance().then((result) => {
	console.log(result);
})

// myContract_write.withdraw().then((result) => {
// 	console.log(result);
// })

// myContract_write.getRacers().then((result) => {
// 	console.log(result);
// })

// myContract_write.addFunds({value:'1000000000000000000'}).then((result) => {
// 	console.log(result);
// })

// myContract_write.beginRace([40, 186, 144, 102, 81, 197, 96, 277, 244, 197]).then((result) => {
// 		console.log(result);
// 	})

	// myContract_write.endRace([40, 186, 144, 102, 81, 197, 96, 277, 244, 197]).then((result) => {
	// 	console.log(result);
	// })

	



