const express = require('express');
const Router = express.Router();


// -------- Import Controller -----------

const tourPriceController = require('../controllers/tourPriceController');



Router.route("/api/add-tourPrice").post(tourPriceController.addTourPrice);
Router.route("/api/get-tourPrice/:id").get(tourPriceController.getTourPrice);
Router.route("/api/update-tourPrice/:id").put(tourPriceController.updateTourPrice);





module.exports = Router;