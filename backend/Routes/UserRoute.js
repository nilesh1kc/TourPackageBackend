const express = require('express');
const Router = express.Router();
const multer = require("multer");


// ------------ Import Middlewares -----------
const auth = require('../middleware/authMiddleware');



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



// ------- Import Controllers -------------------

const userController = require('../controllers/userController');



Router.route('/api/register').post(upload.single('avatar'), userController.registerUser);
Router.route('/api/login').post( userController.loginUser);
Router.route('/api/get-user/:id').get(userController.getUser);

Router.route('/api/forget-password').post(userController.forgetPassword);
Router.route('/api/verify-token').post(userController.verifyToken);
Router.route('/api/change-password/:id').post(userController.changePassword);
Router.route('/api/reset-password/:key').post(userController.resetPassword);

// GET all the tours subscribed by a user
Router.route('/api/get-my-subscriptions/:id').get(userController.getMySubscriptions);

Router.route("/api/token").post(userController.renewAccessToken);

Router.route('/api/edit-profile/:id').post(userController.editProfile);

module.exports = Router;