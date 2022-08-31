const express = require('express');
const Router =  express.Router();
const multer=require('multer');

// --------- Import controller ------------------
const tourDetailController = require('../controllers/tourDetailController');

const fileStorageEngine = multer.diskStorage({
    destination : (req, file, callback) => {
        const abs_path = __dirname + '\public\\images';
        const abs_path_ = abs_path.replace('Routes','');
        console.log(abs_path_);
        callback(null,  abs_path_);
    },
    filename : (req, file, callback) => {
        console.log("file name called");
        callback(null, file.originalname);
    }
});

const upload = multer({storage : fileStorageEngine }); 


Router.route('/api/add-tourDetail').post(tourDetailController.addTourDetail);
Router.route('/api/get-tourDetail/:id').get(tourDetailController.getTourDetail);
Router.route('/api/getAll-tourDetail').get(tourDetailController.getAllTourDetail);
Router.route('/api/update-tourDetail/:id').put(tourDetailController.updateTourDetail);
Router.route('/api/delete-tour/:id').delete(tourDetailController.deleteTour);
Router.put("/api/add-images-to-tour/:id",upload.single("images"),tourDetailController.addImagesToTour);







module.exports = Router;