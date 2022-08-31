const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, 'Please enter your name'],
        maxlength : [30, "Name cannot exeed 30 characters"]
    },

    email : {
        type : String, 
        required : [true, 'Please enter your Email'],
        unique : true, 
        // validate : [validator.isEmail, "Please Enter a valid Email"]
    },

    password : {
        type : String,
        required : [true, 'Please enter your Password'],
        minlength : [6, "Password should be greater than 6 characters"],
    },

    avatar : {
        type : String,
        required : false
    },
    
    isAdmin : {
        type : Boolean,
        default : 0
    },

    token : {
        type : String,
        default : " ",
    },

    subscriptions : [{
        type : String,
        required : false,
    }]


});


userSchema.pre("save", async function (next) {

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// Compare Password 

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);