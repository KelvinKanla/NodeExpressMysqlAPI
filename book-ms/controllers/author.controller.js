const authorService = require('../services/author.service');
const Joi = require('joi');

const addAuthorSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
});

const updateAuthorSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
});

async function addAuthorController(req, res) {
    try {
        const authorDetails = req.body

        const validationResult = addAuthorSchema.validate(authorDetails);
        if(validationResult.error){
            console.log("Validation error: ", validationResult.error)
            return res.status(400).json({ error: validationResult.error.message});
        }
        const addNewAuthor = await authorService.addAuthor(authorDetails);
        return res.status(200).json({ success: "New author added successfully", data: addNewAuthor })
    } catch (error) {
        console.log("Couldn't add author: ", error)
        return res.status(500).json({ error: "Author could not be added!" });
    }
}

async function deleteAuthorController(req, res) {
    try {
        const authorID = req.params['id']
        const deleteAuthor = await authorService.deleteAuthor(authorID);
        return res.status(200).json({ success: "Author deleted successfully", data: deleteAuthor })
    } catch (error) {
        console.log("Couldn't add author: ", error)
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
        return res.status(200).json({ success: "Author updated successfully", data: updateAuthor })
    } catch (error) {
        console.log("Couldn't add author: ", error)
        return res.status(500).json({ error: "Author could not be updated!" });
    }
}

module.exports = {
    addAuthorController, deleteAuthorController, updateAuthorController,
}