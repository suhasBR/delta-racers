const express = require('express');
const cors = require('cors')
const app = express ();
require('dotenv').config();
const connectDB = require('./db/connect');
const NFT = require("./routes/NFT");
const user = require("./routes/user");

const port = process.env.PORT || 5001;

app.use(cors());


// to parse JSON 
app.use(express.json());

app.use('/api/v1/NFTs',NFT);
app.use('/api/v1/user',user)



app.get('/hello',(req,res) => {
    res.send('Delta Racers');
});







const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        });
    }
    catch(error){
        console.log(error);

    }
}

start();