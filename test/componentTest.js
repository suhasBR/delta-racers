const {expect} = require('chai');
const {ethers} = require("hardhat");

describe("Component NFT Smart Contract test", function() {
    this.beforeEach(async function(){
        //executed before each test
        const component  = await ethers.getContractFactory("ComponentNFT");
        comp = await component.deploy("ComponentNFT contract","COMP");
    })

    it("NFT is minted successfully", async function() {
        [account1] = await ethers.getSigners();

       
        
        expect(await comp.balanceOf(account1.address)).to.equal(0);

        const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tx = await comp.connect(account1).mint(tokenURI)

        expect(await comp.balanceOf(account1.address)).to.equal(1);

    })

    it("tokenURI is set successfully", async function(){

        [account1,account2] = await ethers.getSigners();

        const tokenURI_1 = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tokenURI_2 = "https://opensea-creatures-api.herokuapp.com/api/creature/2"

        const tx1 = await comp.connect(account1).mint(tokenURI_1);
        const tx2 = await comp.connect(account2).mint(tokenURI_2);

        expect(await comp.tokenURI(0)).to.equal(tokenURI_1);
        expect(await comp.tokenURI(1)).to.equal(tokenURI_2);


    })
})