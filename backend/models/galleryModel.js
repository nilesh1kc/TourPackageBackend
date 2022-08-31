const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image : {
        type : String,
        required : false
    },
    location : {
        type : String,
        required : false
    },
    date : {
        type : String,
        required : false,
        default : new Date().toISOString(),
    }
});

module.exports = new mongoose.model("gallery", gallerySchema);