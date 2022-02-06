const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    uri : {
        type: String,
        required: true,
    },
    owner: {
        type : String,
        default : null,
    },
    type: {
        type: String,
        required: true,
    },
    imgSrc : {
        type: String,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
    attributes : [
        {
            trait: {
                type: String,
                required: true,
            },
            value : {
                type: Number,
                required: true,
            }
        }
    ]

});


module.exports = mongoose.model('NFT',NFTSchema);