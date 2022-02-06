const NFT = require("../models/NFT");

const getAllNFTs = async (req, res) => {
  const allTokens = await NFT.find({});
  res.status(200).json({ allTokens });
};

const addNFTs = async (req, res) => {
  try {
    const newNFT = await NFT.create(req.body);
    res.status(201).json({ newNFT });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      err: true,
      msg: error,
    });
  }
};

const getNFTbyType = async (req, res) => {
  try {
    const type = req.query.type;
    const filteredNFTs = await NFT.find({
        address : null,
        type : type
     
    });
    res.status(201).json({ filteredNFTs });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      err: true,
      msg: error,
    });
  }
};

module.exports = {
  getAllNFTs,
  addNFTs,
  getNFTbyType,
};
