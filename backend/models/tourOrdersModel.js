const mongoose = require('mongoose');



const tourOrderSchema = new mongoose.Schema ({

    user_id : {
        type : mongoose.Schema.ObjectId,
        required : true,
    },

    tour_id : {
        type : mongoose.Schema.ObjectId,
        required : true,
    },

    paymentInfo : {

        id: {
            type : String,
            required : true
        },
        
        status: {
            type: String,
            required: true,
            default : "pending"
        },

        paidAt: {
            type : Date,
            required : true, 
        }
    },

    orderStatus : {
        type : String,
        required : true,
        default : "processing"
    },

    AmountPaid : {
        type : String,
        required : true,
        default : null
    },

});



module.exports = new mongoose.model("TourOrders",tourOrderSchema)