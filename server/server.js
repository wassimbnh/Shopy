const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const paymentRoute = require('./routes/paymentRoute');
const cookieParser = require('cookie-parser')
const PORT = 4000;

const app = express();

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


app.listen(PORT,
     () => console.log("Listening on port 4000"));
