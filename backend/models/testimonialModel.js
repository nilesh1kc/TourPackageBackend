const mongoose = require('mongoose');


const testimoniallSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    about : {
        type : String,
        required : true
    },

    remark : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    },

    date : {
        type : String,
        default : new Date().toISOString(),
    },

});

module.exports = new mongoose.model('Testimonial', testimoniallSchema);