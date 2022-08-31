const express = require("express");
const multer = require("multer");
const Router = express.Router();

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

// --------- Controllers-------------
const partnersController = require("../controllers/partnersController");

//  --------- Routes ----------------
// Router.route("/api/add-partner").post(upload.single("image"), partnersController.addPartner);
// Router.route("/api/get-partners").get( partnersController.getPartners);
// Router.route("/api/delete-partner/:id").delete( partnersController.deletePartner);
// Router.route("/api/update-partner/:id").put( partnersController.updatePartner);

module.exports = Router;