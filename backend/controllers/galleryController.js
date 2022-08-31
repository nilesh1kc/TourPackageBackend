const Gallery = require('../models/galleryModel');


//---------------Add to gallery -------------------------

const addImage = async(req, res) => {
    try {
        
        const file_name = 'http://localhost:8200/images/' + req.file.originalname; 
        
        const gallery = new Gallery({
            image : file_name,
            location : req.body.location
        })
        
        await gallery.save();    

        return res.status(201).json({
            Status : 'Success',
            Message : 'New image added to gallery',
            
        });
        
    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
        });
    }
}



// ------------- Delete image from gallery ---------------

const deleteImage = async(req, res) => {
    try {
        const imageFound = await Gallery.findOne({_id : req.params.id});
        if(!imageFound){
            return res.status(404).json({
                Status : 'error',
                Message : 'Image requested not found'
            });
        }

        await imageFound.remove();

        return res.status(200).json({
            Status : 'success',
            Message : 'Image deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error'
        });
    }
}

// --------------- Get all images -------------------------
 
const getAllImages = async(req, res) => {
    try {

        const gallery = await Gallery.find();

        return res.status(200).json({
            Status : 'success',
            Message : 'All images found',
            gallery : gallery,
        });

    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error'
        });
    }    
}

// ----------------- update one image --------------------------

const updateImage = async(req, res) => {
    try {
        
        let image = await findById(req.params.id);

        if(!image){
            return res.status(404).json({
                Status : 'error',
                Message : 'Image not found'
            });
        }

        image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {new : true});

        const updatedImage = await image.save();

        return res.status(200).json({
            Status : 'success',
            Message : 'Image updated successfully'
        });


    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error'
        });
    }
}



module.exports = {
    addImage,
    deleteImage,
    getAllImages,
    updateImage

}