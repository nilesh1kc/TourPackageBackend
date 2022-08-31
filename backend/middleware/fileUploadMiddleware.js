const multer = require('multer');



const fileStorageEngine = multer.diskStorage({
    destination : (req, file, callback) => {

        callback(null,  __dirname+'/public/images');
    },
    filename : (req, file, callback) => {
        console.log("file name called");
        callback(null,  Date.now()+"-"+file.originalname);
    }

    
})

const upload = multer({storage : fileStorageEngine }); 



module.exports = upload;