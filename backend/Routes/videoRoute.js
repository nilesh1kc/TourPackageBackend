const express = require('express');
const Router =  express.Router();




// --------- Controller import ----------------------

const videoController = require("../controllers/videoController");


 // ----------- Routes -------------------

Router.route('/api/add-video').post(videoController.addVideo);
// Add text for icons in clock-wise manner
Router.route('/api/get-video').get(videoController.getVideo);
Router.route('/api/edit-video').post(videoController.editVideo);

module.exports = Router;


