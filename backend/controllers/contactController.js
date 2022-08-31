const Contact = require('../models/contactModel');


//---------------Add contact -------------------------

const addContact = async(req, res) => {
    try {
        
        const contact = await Contact.create(req.body);
        
        await contact.save();    

        return res.status(201).json({
            Status : 'Success',
            Message : 'Contact saved successfully',
            Contact : contact,
            
        });
        
    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
        });
    }
}



// --------------- Get all images -------------------------
 
const getContact = async(req, res) => {
    try {

        const contact = await Contact.find();

        return res.status(200).json({
            Status : 'success',
            Message : 'Contact found',
            contact : contact[0],
        });

    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
        });
    }    
}

// ----------------- update one image --------------------------

const editContact = async(req, res) => {
    try {
        
        let contact = await Contact.find();

        if(contact.length < 0){
            return res.status(404).json({
                Status : 'error',
                Message : 'contact not found'
            });
        }

        await Contact.updateOne({}, {$set : req.body}, {new:true});

        return res.status(200).json({
            Status : 'success',
            Message : 'Image updated successfully',
            updatedContact : contact
        });


    } catch (error) {
        return res.status(500).json({
            Status : 'error',
            Message : 'Internal Server Error',
            Error : error,
             
        });
    }
}



module.exports = {
    addContact,
    editContact,
    getContact,
    

}