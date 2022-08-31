
const Review = require('../models/reviewModel');
const nodemailer = require('nodemailer');

const addReview =  async(req, res) => {
    try {
        const review = await Review.create(req.body);
    

        // const transporter = nodemailer.createTransport({
        //     host : 'smtp.gmail.com',
        //     port : 587,
        //     secure : false,
        //     requireTLS : true,
        //     auth : {
        //         user : process.env.USER_EMAIL,
        //         pass : process.env.USER_PASSWORD
        //     }
        // });

        // const mailOptions = {
        //     from : process.env.USER_EMAIL,
        //     to : process.env.USER_EMAIL,
        //     subject : 'New review ',
        //     html : '<b> from </b> :' + req.body.name +'<br>' + '<b>City</b> ' + req.body.city + '<br>' + '<b> Phone </b> ' + req.body.phone + '<br>' + '<b>Message</b>  ' + req.body.message,  
        // }

        // transporter.sendMail(mailOptions, function(error, info){
        //     console.log("working");
        //     if(error){
        //         console.log(error);
        //     }else{
        //         console.log("Mail has been sent: ", mailOptions);
        //     }
        // });

        res.status(201).json({
            status : 'success',
            message : "New review has been added",
            data : review
        }) ;

    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error',
            Error : error,
            
        });
    }
}

const getAllReviews =  async(req, res) => {
    try {
        
        const Reviews = await Review.find({tour_id : req.params.id});

        res.status(200).json({
            status : 'success',
            message : "All the reviews fetched successfully!",
            Reviews 
        }) ;

    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error'
        });
    }
}


module.exports = {
    addReview,
    getAllReviews
}