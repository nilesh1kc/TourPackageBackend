
// ------- Model Import ------------------------------------

const TourCard = require("../models/tourCardModel");


// --------- Create Tour card data ( Admin ) ---------------

const createTourCard = async(req, res) => {
    try {

        // const tourCard = await TourCard.create(req.body);

        const tourCard = new TourCard({
            
            name : req.body.name,
            image : req.body.image,
            duration : req.body.duration,
            city : req.body.city,
            brief : req.body.brief,
            totalSeats : req.body.totalSeats,
            lastDate : req.body.lastDate

        });
        const Tourcard =  await tourCard.save();

        res.status(201).json({ 
            success : true,
            Tourcard
            
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : 'error',
            message : "Internal Server Error"
        });
    }
}


// ---------- Get all Tour Cards data ----------------------

const getAllTourCards = async(req, res) => {
    try {
        const tourCard = await TourCard.find();
        
        res.status(200).json({
            success : true,
            tourCard,
            message : "All tour cards extracted"
        });


    } catch (error) {
            res.status(500).json({
                status : 'error',
                message : 'Internal server error',
                
                
            });
    }
}

// --------------- Get single Tour Card -----------------

const getTourCard = async(req, res) => {
    const tourCard = await TourCard.findById(req.params.id);

    try {
        if(!tourCard){
            return res.status(400).json({
                success : false, 
                message : 'Tour Card not found!'
            });
        }
    
        return res.status(200).json({
            sucess : true, 
            tourCard,
            message : 'Tour Card found successfully'
        });
        
    }catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error',
            

        });
    }
}


// --------------- Update Tour Card Data ----------------

const updateTourCard = async(req, res) => {
    try {
        let tourCard = await TourCard.findById(req.params.id);

        if(!tourCard){
            return res.status(500).json({
                sucess : false,
                message : 'Tour Card not found!'
            });
        }

        tourCard = await TourCard.findByIdAndUpdate(req.params.id, req.body, {
            // ---- Check bro ----
            new : true,
            runValidators : true,
            useFindAndModify : false
            // -------------------
        });
        const updatedTourCard = await tourCard.save();

        res.status(200).json({
            success : true,
            updatedTourCard
        })

        
    } catch (error) {
        res.status(500).json({
            status : 'error',
            message : 'Internal server error'
        });
    }
}


// ---------------- Delete a tour card ---------------------

const deleteTourCard = async(req, res) => {
    try {
        const tourCard = await TourCard.findById(req.params.id);

        if(!tourCard){
            return res.status(400).json({
                success : false,
                meessage : 'Tour card not found!'
            });
        }

        await tourCard.remove();

        res.status(200).json({
            sucess : true,
            message : 'Tour Card deleted successfully'
        });
        
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : 'Internal Server Error'
        });
    }
}





module.exports = {
    createTourCard,
    getTourCard,
    getAllTourCards,
    updateTourCard,
    deleteTourCard
}
