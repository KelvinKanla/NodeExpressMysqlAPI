const bmService = require('../services/book.service');
const Joi = require('joi');

const addBookSchema = Joi.object({
    title: Joi.string().required(), // limit number
    author_id : Joi.number().required(),
    publication_year : Joi.number().required(), // year type and range
    number_of_copies : Joi.number().required()
})

const updateBookSchema = Joi.object.min({
    title: Joi.string(),
    author_id : Joi.number(),
    publication_year : Joi.number(),
    number_of_copies : Joi.number()
}).min(1);

async function addBookController(req, res) {
    try {

        const bookDetails = req.body
        
        const validationResult = addBookSchema.validate(bookDetails)
        if(validationResult.error){
            return res.status(400).json({error: validationResult.error.message}); // How to pass a custom message
        }
        const addNewBook = await bmService.addBook(bookDetails);
        return res.status(200).json({ success: "New book added successfully", data: addNewBook })
    } catch (error) {
        console.log("Couldn't add book: ", error)
        return res.status(500).json({ error: "Book could not be added!" });
    }
}

async function deleteBookController(req, res) {
    try {
        const bookID = req.params['id']
        const deleteBook = await bmService.deleteBook(bookID);
        return res.status(200).json({ success: "Book deleted successfully", data: deleteBook })
    } catch (error) {
        console.log("Couldn't add book: ", error)
        return res.status(500).json({ error: "Book could not be deleted!" });
    }
}

async function updateBookController(req, res) {
    try {
        const bookID = req.params['id']
        const bookDetails = req.body;

        const validationResult = updateBookSchema.validate(bookDetails)
        if(validationResult.error){
            return res.status(400).json({error: validationResult.error.message});
        }
        const updateBook = await bmService.updateBook(bookDetails, bookID);
        return res.status(200).json({ success: "Book updated successfully", data: updateBook })
    } catch (error) {
        console.log("Couldn't add book: ", error)
        return res.status(500).json({ error: "Book could not be updated!" });
    }
}

module.exports = {
    addBookController, deleteBookController, updateBookController,
}