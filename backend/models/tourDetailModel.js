const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({

    tourCardData : {
        title : {
            type     : String,
            required : false
        
        },
        image : {
            type     : String,
            required : false
        
        },
        
        price : {
            type : String,
            required : false
        },
        
        USD_price : {
            type : String,
            required : false
        },
        
        meta : [{
            type : String,
            required : false
        }],

        start_date : {
            type : String,
            reqiured : false,
        
        },

        end_date : {
            type : String,
            required : false,
            
        },
    
    },

    tourDetailOne : {

        title: {
            type : String,
            required : false
        },

        image : [{
            type : String,
            required : false
        }],
    
        price: {
            type : String,
            required : false
        },

        USD_price: {
            type : String,
            required : false
        },
    
        duration: {
            type : String,
            required : false
        },
    
        totalSeats: {
            type : String,
            required : false
        },
    
        location: {
            type : String,
            required : false
        },

        date : {
            type : String,
            required : false
        },
    
        start_date: {
            type : String,
            required : false,
        },
        end_date: {
            type : String,
            required : false,
        },
        
    },

    tourDetailLeft : {
        
        overview: {
            type : String,
            required : false
        },
        
        overviewList: [{
            type : String,
            required : false
        }],
        
        faq: [
          {
            id: {
                type : Number,
                required : false
            },
            title: {
                type : String,
                required : false
            },
            text: {
                type : String,
                required : false
            },
            lists: [{
                type : String,
                required : false
            }],
          },
        
        ],

        itinerary : [{
            type : String, 
            required : false
        }],

        comments : [{
            
            id: {
                type : Number,
                required : false
            },
            image: {
                type : String,
                required : false
            },
            name: {
                type : String,
                required : false
            },
            date: {
                type : String,
                required : false
            },
            title: {
                type : String,
                required : false
            },
        
            message: {
                type : String,
                required : false
            },
        
            services: {
                type : Number,
                required : false
            },
            locations: {
                type : Number,
                required : false
            },
            amenities: {
                type : Number,
                required : false
            },
            prices: {
                type : Number,
                required : false
            },
            food: {
                type : Number,
                required : false
            },
          }],
            reviews : [{
        
            id: {
                type : Number,
                required : false
            },
            title: {
                type : String,
                required : false
            },
            star: {
                type : Number,
                required : false
            },
          
        }],

        tour_status : {
            type : String,
            default : true
        },
        seats_booked : {
            type : Number,
            default : 0,
        }

    },




})



module.exports = new mongoose.model("TourDetails", tourSchema);



