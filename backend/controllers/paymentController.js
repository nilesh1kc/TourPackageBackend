const razorpay = require('razorpay');
const crypto = require('crypto');
const TourDetails = require('../models/tourDetailModel');
const UserDetails = require('../models/userModel');
const nodemailer = require('nodemailer');

const createOrder = async(req, res) => {
    try {

        // Instantiate razorpay
        const instance = new razorpay({
            key_id : process.env.KEY_ID,
            key_secret : process.env.KEY_SECRET,
        });

        const options = {
            amount : req.body.amount*100,
            currency : 'INR',
            receipt : crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (err, order) => {
            console.log(order);
            if(err){
                console.log(err);
                return res.status(500).json({ message : "Something went wrong "});
            }
            res.status(200).json({ 
                orderId : order.id,
                data : order
            });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : "Error",
            message : "Internal Server Error!",
            Error : error
        });
    }
}


const verifyPayment = async(req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature, tour_id, user_email} = req.body;

            const userFound = await UserDetails.findOne({email : user_email});
            const tourFound = await TourDetails.findOne({_id : tour_id});

        // Creating a hmac hex digest using SHA256 algo
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

            if(razorpay_signature === expectedSign) {

                console.log(tourFound, 'TOUR FOUND');

                tourFound.tourDetailLeft.seats_booked += 1;
                if(tourFound.tourDetailOne.totalSeats === tourFound.seats_booked){
                    tourFound.tour_status = false;
                }

                await tourFound.save();

                userFound.subscriptions.push(tour_id);
                await userFound.save();

                const transporter = nodemailer.createTransport({
                    host : 'smtp.gmail.com',
                    port : 587,
                    secure : false,
                    requireTLS : true,
                    auth : {
                        user : process.env.USER_EMAIL,
                        pass : process.env.USER_PASSWORD
                    }
                });
                
                const mailOptions = {
                    from : process.env.USER_EMAIL,
                    to : userFound.email,
                    subject : 'TOUR BOOKED SUCCESSFULY! ',
                    text : 'Hello! '+userFound.name +'<br>',   
                    html :  'You booking for the tour <b>'+tourFound.tourCardData.title+'</b> is successful! '
                }
                
                transporter.sendMail(mailOptions, function(error, info){
                    console.log("working");
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Mail has been sent: ", mailOptions);
                    }
                });

                return res.status(200).json({
                    status : "Success",
                    message : "Payment verfied successfully!",
                    Tour : tourFound,
                    User : userFound,
                });
            }else{
                return res.status(400).json({
                    status : "Failure",
                    message : "Invalid signature send!"
                });
            }

    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : "Internal Server Error",
            Error : error
        });
    }

}










module.exports = {
    createOrder,
    verifyPayment
}