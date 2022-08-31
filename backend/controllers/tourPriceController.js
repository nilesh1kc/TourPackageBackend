// ------------ Import Model -------------------------

const tourPrice = require("../models/tourPriceModel");

const addTourPrice = async (req, res) => {
  try {
    const tourprice = await tourPrice.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Tour Price added Successfully",
      tourprice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getTourPrice = async (req, res) => {
  const tourprice = await tourPrice.find({ tour_id: req.params.id });

  if (!tourprice) {
    return res.status(400).json({
      success: "false",
      message: "Tour not found!",
    });
  }
  return res.status(200).json({
    success: true,
    tourprice,
    message: "Tour price found successfully",
  });
};

const updateTourPrice = async (req, res) => {
  try {
    let tourprice = await tourPrice.find({ tour_id: req.params.id });

    if (!tourprice) {
      return res.status(404).json({
        success: false,
        message: "Tour not found!",
      });
    }

    console.log(tourprice);
    tourprice = await tourPrice.findByIdAndUpdate(tourprice[0]._id, req.body, {new: true,});
    
    // const updatedTourPrice = await tourprice.save();


    return res.status(200).json({
      success: "true",
      message: "Tour price updated successfully!",
    //   updatedTourPrice
    tourprice
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  addTourPrice,
  getTourPrice,
  updateTourPrice,
};
