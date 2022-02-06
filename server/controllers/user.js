const User = require("../models/User");

const getNFTByOwner = async (req, res) => {
  try {
    let owner = req.query.owner;
    let type = req.query.type;

    const data = await User.find({
      owner: owner,
      type: type
    });
    res.status(201).json({ data });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      err: true,
      msg: error,
    });
  }
};

const addMintInfo = async (req, res) => {
    console.log('inside')
  try {
    const newNFT = await User.create(req.body);
    res.status(201).json({ newNFT });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      err: true,
      msg: error,
    });
  }
};

module.exports = {
  getNFTByOwner,
  addMintInfo
};
