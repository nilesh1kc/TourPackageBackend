const dotenv = require('dotenv');
dotenv.config('backend/.env');
// import {format} from 'date-fns';




// ----- import packages ------------
const express = require('express');
const app = express();

const CORS = require('cors');
app.use(CORS({origin : "*"}));
app.use(express.json());
app.use(express.static('public'));
// const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// app.use(cors());




// ---------- Database Connection --------------

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser : true});

// ----------- Routes imported -----------

const userRoute = require('./Routes/UserRoute');
const tourPriceRoute = require('./Routes/TourPriceRoute');
const paymentRoute = require('./Routes/PaymentRoute');
const tourDetailRoute = require('./Routes/TourDetailRoute');
const enquiryRoute = require('./Routes/EnquiryRoute');
const reviewRoute = require('./Routes/ReviewRoute');
const testimonialRoute = require('./Routes/TestimonialsRoute');
const galleryRoute = require('./Routes/GalleryRoute');
const videoRoute = require('./Routes/videoRoute');
const contactRoute = require('./Routes/contactRoute');

// ---------- Use Routes ------------------

app.use('/', userRoute);
app.use('/', tourPriceRoute);
app.use('/', paymentRoute);
app.use('/', tourDetailRoute);
app.use('/', enquiryRoute);
app.use('/', reviewRoute);
app.use('/', testimonialRoute);
app.use('/', galleryRoute);
app.use('/', videoRoute);
app.use('/', contactRoute);


// ---------- Server listening ------------
app.listen(process.env.PORT, function(){
    console.log("Server listening on 8200");
});

