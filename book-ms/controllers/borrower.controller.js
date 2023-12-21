const borrowerService = require('../services/borrower.service')
const Joi = require('joi');

const addBorrowerSchema = Joi.object({
    book_id: Joi.number().required(), 
    user_id: Joi.number().required(),
    borrow_date: Joi.date().max(new Date()).required(),
    return_date: Joi.date().min(Joi.ref('borrow_date')).required()
});

const updateBorrowerSchema = Joi.object({
    book_id: Joi.number(), 
    user_id: Joi.number(),
    borrow_date: Joi.date().max(new Date()), // new Date() gives today's date
    return_date: Joi.date().min(Joi.ref('borrow_date')) // ensures return date is always after borrow date
}).min(1);

async function addBorrowerController(req, res) {
    try {
        const borrowerDetails = req.body

        const validationResult = addBorrowerSchema.validate(borrowerDetails);
        if(validationResult.error){
            return res.status(400).json({error: validationResult.error.message})
        }
        const addNewBorrower = await borrowerService.addBorrower(borrowerDetails);
        return res.status(200).json({ success: "New borrower added successfully", data: addNewBorrower })
    } catch (error) {
        console.error("Couldn't add borrower: ", error)
        return res.status(500).json({ error: "Borrower could not be added!" });
    }
}

async function deleteBorrowerController(req, res) {
    try {
        const borrowerID = req.params['id']
        const deleteBorrower = await borrowerService.deleteBorrower(borrowerID);
        return res.status(200).json({ success: "Borrower deleted successfully", data: deleteBorrower })
    } catch (error) {
        console.error("Couldn't add borrower: ", error)
        return res.status(500).json({ error: "Borrower could not be deleted!" });
    }
}

async function updateBorrowerController(req, res) {
    try {
        const borrowerID = req.params['id']
        const borrowerDetails = req.body;

        const validationResult = updateBorrowerSchema.validate(borrowerDetails);
        if(validationResult.error){
            return res.status(400).json({error: validationResult.error.message})
        }
        const updateBorrower = await borrowerService.updateBorrower(borrowerDetails, borrowerID);
        return res.status(200).json({ success: "Borrower updated successfully", data: updateBorrower })
    } catch (error) {
        console.error("Couldn't add error borrower: ", error)
        return res.status(500).json({ error: "Borrower could not be updated!" });
    }
}

module.exports = {
    addBorrowerController, deleteBorrowerController, updateBorrowerController,
}
