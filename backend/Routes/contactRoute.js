const express = require('express');
const Router =  express.Router();




// --------- Controller import ----------------------

const contactController = require("../controllers/contactController");


 // ----------- Routes -------------------

Router.route('/api/add-contact').post(contactController.addContact);
Router.route('/api/get-contact').get(contactController.getContact);
Router.route('/api/edit-contact').post(contactController.editContact);

module.exports = Router;


