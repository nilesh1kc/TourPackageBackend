const partnersModel = require("../models/partnersModel");
//------------------Add Partners------------------
const addPartner = async (req, res) => {
    try {
        const file_name =
            "http://localhost:8200/images/" + req.file.originalname;
​
        const partner = new partnersModel({
            image: file_name,
            partnerName: req.body.partnerName,
        });
​
        await partner.save();
​
        return res.status(201).json({
            status: "Success",
            message: "Partner Saved",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Status: "error",
            Message: "Internal Server Error",
            Error: error,
        });
    }
}
​
//------------------Delete Partner------------------
const deletePartner = async (req, res) => {
    try {
        const partnerFound = await partnerModel.findOne({ _id: req.params.id });
​
        if (!partnerFound) {
            return res.status(404).json({
                Status: "error",
                Message: "Partner not found",
            });
        }
​
        await partnerFound.remove();
​
        return res.status(200).json({
            status: "success",
            message: "Partner deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}
// ​
// //------------------Get Partners------------------
// const getPartners = async (req, res) => {
//     try {
//         const partners = await partnersModel.find();
// ​
//         return res.status(200).json({
//             status: "success",
//             message: "All Partners Found",
//             partners: partners,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             Status: "error",
//             Message: "Internal Server Error",
//             Partners : partners,
//         });
//     }
// }
​
//------------------Update Partners------------------
// const updatePartner = async (req, res) => {
//     try {
//         let partner = await partnersModel.findById;
// ​
//         if (!partner) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Image not found",
//             });
//         }
// ​
//         partner = await partnersModel.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {
//                 new: true,
//             }
//         );
// ​
//         const updatePartner = await partner.save();
// ​
//         return res.status(200).json({
//             status: "success",
//             message: "Partner updated successfully",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: "error",
//             message: "Internal Server Error",
//         });
//     }
// }

module.exports = {
    addPartner,
    deletePartner,
    
}
