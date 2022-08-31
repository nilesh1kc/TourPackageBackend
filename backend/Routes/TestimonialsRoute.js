const express = require('express');
const Router = express.Router();
const multer = require("multer");
   


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
      const abs_path = __dirname + "public\\images";
      const abs_path_ = abs_path.replace("Routes", "");
      console.log(abs_path_);
      callback(null, abs_path_);
    },
    filename: (req, file, callback) => {
      console.log("file name called");
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage: fileStorageEngine });

// --------- Controller import ----------------------

const testimonialController = require("../controllers/testimonialController");


// ----------- Routes -------------------------------

Router.route('/api/add-testimonial').post(upload.single('image'),testimonialController.addTestimonial);
Router.route("/api/update-testimonial/:id").put(testimonialController.updateTestimonial);
Router.route("/api/get-testimonial/:id").get(testimonialController.getTestimonial);
Router.route("/api/getAll-testimonials").get(testimonialController.getAllTestimonials);
Router.route("/api/delete-testimonial/:id").delete(testimonialController.deleteTestimonial);


module.exports = Router;