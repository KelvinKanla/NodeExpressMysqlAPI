const authorService = require('../services/author.service');
const Joi = require('joi').extend(require('@joi/date'));;

const addAuthorSchema = Joi.object({
    first_name: Joi.string().max(60).required(),
    last_name: Joi.string().max(60).required(),
    dob: Joi.date().format('YYYY-MM-DD').max('now').iso().required()
}); 

const updateAuthorSchema = Joi.object({
    first_name: Joi.string().max(60).label('first name'),
    last_name: Joi.string().max(60),
    dob: Joi.date().format('YYYY-MM-DD').max('now').iso()
}).min(1);

async function addAuthorController(req, res) {
    try {
        const authorDetails = req.body

        const validationResult = addAuthorSchema.validate(authorDetails);
        if(validationResult.error){
            console.log("Validation error: ", validationResult.error)
            return res.status(400).json({ error: validationResult.error.details});
        }
        const addNewAuthor = await authorService.addAuthor(authorDetails);

        const newUserRecord = { id: addNewAuthor.insertId, ...authorDetails };

        return res.status(200).json({ success: "New author added successfully", data: newUserRecord })
    } catch (error) {
        console.error("Couldn't add author: ", error)
        return res.status(500).json({ error: "Author could not be added!" });
    }
}

async function deleteAuthorController(req, res) {
    try {
        const authorID = req.params['id']
        const deleteAuthor = await authorService.deleteAuthor(authorID);
        return res.status(200).json({ success: "Author deleted successfully", data: deleteAuthor })
    } catch (error) {
        console.error("Couldn't add author: ", error)
        return res.status(500).json({ error: "Author could not be deleted!" });
    }
}

async function updateAuthorController(req, res) {
    try {
        const authorID = req.params['id']
        const authorDetails = req.body;

        const validationResult = updateAuthorSchema.validate(authorDetails);
        if(validationResult.error){
            console.log("Validation error: ", validationResult.error)
            return res.status(400).json({ error: validationResult.error.message});
        }
        const updateAuthor = await authorService.updateAuthor(authorDetails, authorID);

        if (updateAuthor.affectedRows === 0) {
            return res.status(404).json({ error: `Author with ID ${authorID} not found.` });
        }

        return res.status(200).json({ success: "Author updated successfully", data: updateAuthor })
    } catch (error) {
        console.error("Couldn't add author: ", error)
        return res.status(500).json({ error: "Author could not be updated!" });
    }
}

async function getAllAuthorsController(req, res) {
    try {
        const authors = await authorService.getAllAuthors();
        return res.status(200).json({ success: "Authors fetched successfully", data: authors });
    } catch (error) {
        console.error("Error fetching authors: ", error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}

module.exports = {
    addAuthorController, deleteAuthorController, updateAuthorController, getAllAuthorsController
}