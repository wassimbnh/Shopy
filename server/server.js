const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const paymentRoute = require('./routes/paymentRoute');
const cookieParser = require('cookie-parser')
const PORT = 4000;


const app = express();

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var ressources = coinbase.resources;
 
Client.init(process.env.COINBASE_API_KEY);



app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());


//db
mongoose.connect(
    process.env.MONGO_URL,
    console.log('db connected')
);

//routes
app.use('/api/auth',userRoutes);
app.use( paymentRoute);
app.post("/crypto-checkout", async (req,res)=>{
    const { amount, currency} = req.body;

    try{

        const charge = await ressources.Charge.create({
            name: 'The Sovereign Individual',
    description: 'Mastering the Transition to the Information Age',
    local_price: {
        amount: amount,
        currency: currency
    },
    pricing_type: 'fixed_price',
    
        });

        res.status(200).json({
            charge: charge,

        })
    }catch(err){
        res.status(500).json({msg: err.message})
    }
});

app.listen(PORT,
     () => console.log("Listening on port 4000"));
