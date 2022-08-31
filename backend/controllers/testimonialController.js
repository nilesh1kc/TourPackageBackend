const Testimonial = require("../models/testimonialModel");

// ------- Add a testimonial ----------------------------------------------------

const addTestimonial = async (req, res) => {
  try {
    const file_name = "http://localhost:8200/images/" + req.file.originalname;

    console.log(file_name, "req.body-------------");

    const testimonial = new Testimonial({
      name: req.body.name,
      image: file_name,
      about: req.body.about,
      remark: req.body.remark,
    });

    const newTestimonial = await testimonial.save();

    res.status(201).json({
      status: "success",
      message: "Testimonial has been added sucessfully!",
      Testimonial: testimonial,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      Error: error,
    });
  }
};

// ------------ Get a testimonial ----------------------------------------------

const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ _id: req.params.id });

    if (!testimonial) {
      res.status(404).json({
        status: "error",
        message: "Testimonial not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Testimonial found!",
      Testimonial: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// ----------- Get all testimonials -------------------------------------------

const getAllTestimonials = async (req, res) => {
  try {
    const testimonial = await Testimonial.find();
    res.status(200).json({
      success: true,
      testimonial,
      message: "All testimonials extracted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// ------------ Edit a testimonial -----------------------------------------

const updateTestimonial = async (req, res) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(500).json({
        sucess: false,
        message: "Testimonial not found!",
      });
    }

    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const updatedTestimonial = await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial has been updated successfully",
      updatedTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

//-------------- Delete a testimonial ---------------------------------------

const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(400).json({
        success: false,
        meessage: "Testimonial not found!",
      });
    }

    await testimonial.remove();

    res.status(200).json({
      sucess: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addTestimonial,
  getTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
};
