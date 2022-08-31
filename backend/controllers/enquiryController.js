
const Enquiry = require('../models/enquiryModel');
const nodemailer = require('nodemailer');

const addEnquiry =  async(req, res) => {
    try {
        const enquiry = await Enquiry.create(req.body);
    

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
            from : req.body.email,
            to : process.env.USER_EMAIL,
            subject : 'New inquiry',
            text : 'Hey!, you have an inquiry. Please check!',
            html : '<b> from </b> :' + req.body.name +'<br>' + '<b>City</b> ' + req.body.city + '<br>' + '<b> Phone </b> ' + req.body.phone + '<br>' + '<b>Message</b>  ' + req.body.message,  
        }

        transporter.sendMail(mailOptions, function(error, info){
            // console.log("working");
            if(error){
                console.log(error);
            }else{
                console.log("Mail has been sent: ", mailOptions);
            }
        });

        res.status(201).json({
            status : 'success',
            message : "New enquiry has been added",
            data : enquiry
        }) ;

    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error',
            Error : error,
            
        });
    }
}

const getAllEnqueries =  async(req, res) => {
    try {
        
        const Enqueries = await Enquiry.find();

        res.status(200).json({
            status : 'success',
            message : "All the enqueries fetched successfully!",
            Enqueries
        }) ;

    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error'
        });
    }
}








module.exports = {
    addEnquiry,
    getAllEnqueries
}