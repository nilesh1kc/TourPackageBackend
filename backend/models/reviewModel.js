
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    tour_id : {
        type : String, 
        required : true,
    },
    
    name : {
        type : String,
        required : true
    },

    email : {
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

    message : {
        type : String,
        required : true
    },
    
    date: {
        type : String,
        required : false
    },
    

});

module.exports = new mongoose.model('Review', reviewSchema);