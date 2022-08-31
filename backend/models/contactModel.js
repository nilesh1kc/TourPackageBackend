const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    phone : {
        type : String,
        required : false
    },

    email : {
        type : String,
        required : false
    },

    address : {
        type : String,
        required : false
    },
    
});

module.exports = new mongoose.model("Contact", contactSchema);