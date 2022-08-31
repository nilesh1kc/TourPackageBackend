const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    
    first : {
        type : String, 
        required : false
    },

    second : {
        type : String,
        required : false,
    },

    third : {
        type : String,
        required : false
    },

    fourth : {
        type : String,
        required : false
    },
    
    video_id : {
        type : String,
        required : false
    }
});

module.exports = new mongoose.model("video", videoSchema);