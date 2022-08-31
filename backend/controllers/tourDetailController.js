const TourDetail = require('../models/tourDetailModel');
const { findById, find } = require('../models/userModel');


// ------- Add a tour ----------------------------------------------------

const addTourDetail = async(req, res) => {
    try {
        const Tour = await TourDetail.create(req.body);

        res.status(201).json({
            status : 'success', 
            message : 'Tour has been added sucessfully!',
            Tour

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : 'error',
            message : 'Internal server error',
            Error : error
        });
    }
}

// ------------ Get a tour ----------------------------------------------

const getTourDetail = async(req, res) => {
    try {
        const Tour = await TourDetail.findOne({_id : req.params.id});
        
        if(!Tour){
            return res.status(404).json({
                status : 'error',
                message : 'Tour not found!'
            });
        }

        return res.status(200).json({
            status : 'success', 
            message : 'Tour found!',
            Tour

        });
        
    } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({
            error : error,
            status : 'error',
            message : 'Internal server error'
        });
    }
}



// ------------- get all tours ---------------------------------------

const getAllTourDetail = async(req, res) => {
    try {
        
        const Tours = await TourDetail.find();

        if(!Tours) {
            res.status(404).json({
                status : 'error',
                message : 'No tour found!'
            });
        }

        res.status(200).json({
            status : 'success',
            message : 'Tours Found',
            Tours
        });

    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error'
        });
    }
}

// ------------ Update a tour -----------------------------------------

const updateTourDetail = async(req, res) => {
    try {
        let Tour = await TourDetail.findById(req.params.id);

        if(!Tour){
            return res.status(500).json({
                sucess : false,
                message : 'Tour not found!'
            });
        }

        Tour = await TourDetail.findByIdAndUpdate(req.params.id, req.body, { new : true});

        const updatedTour = await Tour.save();

        res.status(200).json({
            success : true,
            message : "Tour has been updated successfully",
            updatedTour
        });

        
    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error'
        });
    }
}


const deleteTour = async(req, res) => {
    try {
        const tour = await TourDetail.findById(req.params.id);

        if(!tour){
            return res.status(400).json({
                success : false,
                meessage : 'Tour card not found!'
            });
        }

        await tour.remove();

        res.status(200).json({
            sucess : true,
            message : 'Tour deleted successfully'
        });
        
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : 'Internal Server Error'
        });
    }
}

// ----------------- Add Images---------------------

const addImagesToTour = async(req, res) => {
    try {

        const findTour = await TourDetail.findById(req.params.id);
        // // console.log(findTour);
        // if (!findTour) {
        //     return res.status(404).json({
        //         Status: "error",
        //         Message: "Requested tour not found",
        //     });
        // }
        const file_name = "http://localhost:8200/images/" + req.file.originalname;


        findTour.tourDetailOne.image.push(file_name);



        await findTour.save();

        res.status(200).json({
            Status: "Success",
            Message: "Images added successfully",
            Tour : findTour,
            
        });

        
    } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
        });
    }
}

// ---------------- Search Tour --------------------------------

const searchTour = async(req, res) => {
    try {
        const tours = await TourDetail.findOne({"tourCardData.title" : req.params.key});

        if(!tours){
            return res.status(404).json({
                Status : 'Error',
                Message : 'No Tour found'
            })  
        }

        return res.status(200).json({
            Status : 'Success',
            Message : 'Tour found',
            TourFound : tours
        })
    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
            tourSearched : tours,
        });
    }
}


const addYoutubeLink = (req, res) => {
    try {

        
    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
        });
    }
}

module.exports = {
    addTourDetail,
    getTourDetail,
    getAllTourDetail,
    updateTourDetail,
    deleteTour,
    addImagesToTour,
    searchTour,
    
}