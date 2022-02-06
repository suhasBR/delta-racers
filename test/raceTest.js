const {expect} = require('chai');
const {ethers} = require("hardhat");

describe("Component NFT Smart Contract test", function() {
    this.beforeEach(async function(){
        //executed before each test
        const raceRef  = await ethers.getContractFactory("Race")
        race = await raceRef.deploy("ComponentNFT contract","COMP")
        await race.deployed();
    })

    it("got Solana price successfully", async function(){
        // expect(await race.getLatestPrice());
        const ret = await race.logger();
        console.log(ret);
    })

    
})