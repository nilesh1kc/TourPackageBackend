
// Import model
const Video = require('../models/videoModel');



// Add video link

const addVideo = async(req, res) => {
    try {

        const video_block= await Video.create(req.body);
        res.status(201).json({
            Status : 'success',
            Message : 'Video added Successfully',
            Video_Block : video_block,
        })
        
    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
        });
    }
}



// GET video link

const getVideo = async(req, res) => {
    try {
        const video_block = await Video.find();
        
        if(!video_block){
            res.status(404).json({
                status : 'error',
                message : 'video not found!'
            });
        }

        res.status(200).json({
            status : 'success', 
            message : 'Video found!',
            Video_Block : video_block[0]
            

        });
        
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            status : 'error',
            message : 'Internal server error',
            Error : error,
        });
    }
}

// Edit video link

const editVideo = async(req, res) => {
    try {
        const video_block = await Video.find();

        if(video_block.length < 0){
            return res.status(500).json({
                Status : 'Error',
                Message : 'Video not found!'
            });
        }

        // const updatedBlock = await Video.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        await Video.updateOne({}, {$set : req.body}, {new:true});
        


        res.status(200).json({
            success : true,
            message : "Video has been updated successfully",
            Video_Block : video_block
        });

        
    } catch (error) {
        console.log(error, '----------');
        res.status(500).json({
            status : 'error',
            message : 'Internal server error',
            Error : error
        });
    }
};


module.exports = {
    addVideo,
    editVideo,
    getVideo,
};