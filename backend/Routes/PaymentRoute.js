const express = require('express');
const razorpay = require('razorpay');
const crypto = require('crypto');
const Router = express.Router();



// ---------- Import Controllers -----------

const paymentController = require('../controllers/paymentController');


// API to create an order and receive an order_id in response
Router.route('/api/payment-order').post(paymentController.createOrder);

// API to verify razorpay signature 
Router.route('/api/payment-verify').post(paymentController.verifyPayment);


//  Payment faliure Model (failed or success both)


module.exports = Router;