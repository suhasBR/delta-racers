const express = require('express');
const router = express.Router();

const {
    getAllNFTs, 
    addNFTs,
    getNFTbyType
} = require("../controllers/NFT");

router.route('/').get(getAllNFTs);
router.route('/addNew').post(addNFTs);
router.route('/getNFTbyType').get(getNFTbyType);

module.exports = router;