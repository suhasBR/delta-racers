const express = require('express');
const router = express.Router();

const {
    getNFTByOwner,
    addMintInfo
} = require("../controllers/user");


router.route('/mint').post(addMintInfo);
router.route('/getNFTByOwner').get(getNFTByOwner);

module.exports = router;