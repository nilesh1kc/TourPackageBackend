const mongoose = require('mongoose');

const tourPrice_schema = new mongoose.Schema({

    // ---- Tour card's Object _id will be passed over here --------
    
    tour_id : {
        type : mongoose.Schema.ObjectId,
        required : true
    },

    price : {
        type : String,
        reqiured : true
    },

    currency : {
        type : String,
        required : true
    },

    discount : {
        type : String,
        required : true
    }

});


module.exports = new mongoose.model('TourPrice', tourPrice_schema);

