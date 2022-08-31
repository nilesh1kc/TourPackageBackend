const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    city : {
        type : String,
        required : true
    },

    country : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true
    },

    tour_name : {
        type : String, 
        requried : false
    },

    message : {
        type : String,
        required : true
    },
    
    date: {
        type : String,
        required : false
    },
    

});


module.exports = new mongoose.model("Enquiri", enquirySchema);