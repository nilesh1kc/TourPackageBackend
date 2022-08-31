const express = require('express');
const Router = express.Router();

// --------- Import Controller ------------
const EnquiryController = require('../controllers/enquiryController');


Router.route('/api/add-enquiry').post(EnquiryController.addEnquiry);
Router.route('/api/get-all-enquiries').get(EnquiryController.getAllEnqueries);



module.exports = Router;