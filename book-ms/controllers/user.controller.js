const userService = require('../services/user.service')
const Joi = require('joi').extend(require('@joi/date'));
// USER CONTROLLERS

const addUserSchema = Joi.object({
    first_name: Joi.string().max(60).required(),
    last_name: Joi.string().max(60).required(),
    dob: Joi.date().format('YYYY-MM-DD').max('now').iso().required()
})

const updateUserSchema = Joi.object({
    first_name: Joi.string().max(60),
    last_name: Joi.string().max(60),
    dob: Joi.date().format('YYYY-MM-DD').max('now').iso()
}).min(1);


async function addUserController(req, res) {
    try {
        const userDetails = req.body

        const validationResult = addUserSchema.validate(userDetails);
        if(validationResult.error)      {
            return res.status(400).json({error: validationResult.error.message})
        }
        const addNewUser = await userService.addUser(userDetails);

        const newUserRecord = { id: addNewUser.insertId, ...userDetails };

        return res.status(200).json({ success: "New user added successfully", data: newUserRecord })
    } catch (error) {
        console.error("Couldn't add user: ", error)
        return res.status(500).json({ error: "User could not be added!" });
    }
}

async function deleteUserController(req, res) {
    try {
        const userID = req.params['id']
        const deleteUser = await userService.deleteUser(userID);
        return res.status(200).json({ success: "User deleted successfully", data: deleteUser })
    } catch (error) {
        console.error("Couldn't add user: ", error)
        return res.status(500).json({ error: "User could not be deleted!" });
    }
}

async function updateUserController(req, res) {
    try {
        const userID = req.params['id']
        const userDetails = req.body;

        const validationResult = updateUserSchema.validate(userDetails);
        if(validationResult.error)      {
            return res.status(400).json({error: validationResult.error.message})
        }
        const updateUser = await userService.updateUser(userDetails, userID);

        if (updateUser.affectedRows === 0) {
            return res.status(404).json({ error: `User with ID ${userID} not found.` });
        }

        return res.status(200).json({ success: "User updated successfully", data: updateUser })
    } catch (error) {
        console.error("Couldn't add user: ", error)
        return res.status(500).json({ error: "User could not be updated!" });
    }
}

module.exports = {
    addUserController, deleteUserController, updateUserController
}