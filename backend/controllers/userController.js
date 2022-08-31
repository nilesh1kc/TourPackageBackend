const dotenv = require("dotenv");
dotenv.config("backend/.env");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const jsCookie = require("js-cookie");
const UserDetails = require("../models/userModel");

// ----------- Sending reset mail -----------------------------

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "For reset password",
      html: "<p> Hi! " + name + "<br>" + " This is your code" + "<br> " + token,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      console.log("working");
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", mailOptions);
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// -------- Register a User -------------------------------

const registerUser = async (req, res) => {
  try {
    
    const file_name = "http://localhost:8200/images/" + req.file.originalname;

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar : file_name,
    });

    const newUser = await user.save();

    // -------- Generate Access and Refresh Token -------------
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      status: "201",
      success: true,
      newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
      Error: error,
    });
  }
};

// --------- Login user ------------------

const loginUser = async (req, res) => {
  try {
    // -------- Authentication of user --------------------------

    const { email, password } = req.body;


    


    // ------ Check whether given both -----

    if (!email || !password) {
      return res.status(401).json({
        message: "Please Enter Email & Password",
      });
    }

    // -------- Comparing and finding in database ------------

    const user = await User.findOne({ email });;
    
    const id = user._id;




    // --------- If user not found in database ---------------

    if(!user) {
      return res.status(401).json({
        status : 'Error',
        message: "Invalid email or password",
      });
    }
    // const isPasswordMatched = await user.comparePassword(password);
    const isPasswordMatched = await bcrypt.compare(password, user.password);


    

    if (!isPasswordMatched) {
      return res.status(401).json({
        status : 'Error',
        message: "Invalid email or password",
      });
    }

    // -------- Generate Access and Refresh Token -------------

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      id,
      email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// ----------  Renew access token using refresh token ---------

const renewAccessToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ Message: "User not Authenticated" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "User not Authenticated" });
    } else {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      return res.status(201).json({ accessToken: accessToken });
    }
  });
};

const forgetPassword = async(req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    
    if(!userData) {
      return res.status(404).json({
        status: "error",
        message: "Email entered does not exists!",
      });
    }
    console.log(userData)
    const randomString = randomstring.generate();
    
    userData.token = randomString;
    
    await userData.save();

    
    sendResetPasswordMail(userData.name, userData.email, userData.token);
    
    
    
    res.status(200).json({
      success: "true",
      message: "Please check you mail box and reset your password",
      
    });

  } catch (error) {
    console.log(error, "erro to hai");
     res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      Error : error 
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    
    const user = await User.findOne({ token: token });
    

    if(user) {
        res.status(200).json({
            success: "true",
            message: "Token verified !",
            key : user.email,
          });
    }else{
        return res.status(400).json({
            status: "error",
            message: "This link has been expired!",
          });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
// ----------- Reset Password ----------------

const resetPassword = async (req, res) => {
  try {
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const foundUser = await User.findOne({email : req.params.key});

    if(!foundUser){
      return res.status(404).json({
        Status : 'Error',
        Message : 'User not found'
      });
    }

    const userData = await User.updateOne( {email: req.params.key}, { $set: {password : hashedPassword, token:""}});

    res.status(200).json({
      Status: "Success",
      Message: "Password changed successfully !",
      password : userData.password,
    });
  } catch (error) {
    console.log(error, '------------error--------------');
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
// ------- change password --------------------
const changePassword = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    const userData = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { password: newPassword } },
      { new: true }
    );
    res.status(200).json({
      success: "true",
      message: "Password has been changed",
      updateddata: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      Error: error,
    });
  }
};

//-------------- Get User's subscriptions ---------------------------

const getMySubscriptions = async (req, res) => {
  try {
    const userFound = await UserDetails.findOne({ _id: req.params.id });
    const subscriptions = userFound.subscriptions;

    if (subscriptions) {
      res.status(200).json({
        Success: "true",
        Message: "All subscriptions found",
        Subscriptions: subscriptions,
      });
    } else {
      res.status(404).json({
        Message: "No subscription found for the user",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      Error: error,
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.body, "yes us;re hai");
    user.name = req.body.name;
    user.email = req.body.email;

    await user.save();

    res.status(200).json({
      Status: "success",
      Message: "User details updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      Error: error,
    });
  }
};

const getUser = async(req, res) => {
  try {

    const userFound = await User.findById(req.params.id);
    
    return res.status(200).json({
      Status : 'Success',
      Message : 'User found',
      User : userFound,
    })
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      Error: error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  renewAccessToken,
  forgetPassword,
  verifyToken,
  resetPassword,
  getMySubscriptions,
  editProfile,
  changePassword,
  getUser,
};
