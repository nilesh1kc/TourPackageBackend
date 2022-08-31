const express = require('express');
const Router = express.Router();

// --------- Import Controller ------------
const ReviewController = require('../controllers/reviewController');


Router.route('/api/add-review').post(ReviewController.addReview);
Router.route('/api/get-all-reviews/:id').get(ReviewController.getAllReviews);



module.exports = Router;