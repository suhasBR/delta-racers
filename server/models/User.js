const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    owner: {
        type : String,
        default : null,
    },

    type: {
        type : String,
    },
   
    imgSrc : {
        type: String,
        required: true,
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


module.exports = mongoose.model('User',UserSchema);