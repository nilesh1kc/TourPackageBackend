const express = require("express");
const multer = require("multer");
const Router = express.Router();
const fs = require("fs");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    const abs_path = __dirname + "public\\images";
    const abs_path_ = abs_path.replace("Routes", "");
    console.log(abs_path_);
    callback(null, abs_path_);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

// --------- Controllers-------------

const galleryController = require("../controllers/galleryController");

//  --------- Routes ----------------

Router.post("/api/add-to-gallery",upload.single("image"),galleryController.addImage);
Router.route("/api/delete-image/:id").delete(galleryController.deleteImage);
Router.route("/api/get-all-images").get(galleryController.getAllImages);
Router.route("/api/update-image/:id").put(galleryController.updateImage);

module.exports = Router;
