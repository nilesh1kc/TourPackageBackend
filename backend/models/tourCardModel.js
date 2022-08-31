const mongoose = require('mongoose');



const tourCard_schema = new mongoose.Schema({

    title : {
        type     : String,
        required : true
    
    },
    image : {
        type     : String,
        required : true
    
    },
    
    price : {
        type : String,
        required : true
    },

    brief : {
        type : String,
        required : true
    },
    
    meta : [{
        type : String,
        required : true
    }]
    
    // Seats : {
    //     type : Number,
    //     requried : true
    // },
  

    // duration : {
    //     type : String,
    //     required : true
    // },

    // city : {
    //     type : String,
    //     required : true
    // },

    // brief : {
    //     type : String,
    //     required : true
    // },


    // lastDate : {
    //     type : Date,
    //     required : true
    // },

    

});

module.exports = mongoose.model("Tourcard", tourCard_schema );
