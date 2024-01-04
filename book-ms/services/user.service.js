const mysql = require('./db')
// USER CRUD

async function addUser(userDetails){
    try {
        console.log("Starting...")
        const query = 'INSERT INTO Users SET ?';
        const insertQuery = await mysql.queryResult(query, [userDetails]);
        console.log("User details: ", insertQuery);
        return insertQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "User could not be added!" });
    }
}

async function deleteUser(userID){
    try {
        console.log("Starting...")
        const query = 'DELETE FROM Users WHERE id = ' + userID;
        const deleteQuery = await mysql.queryResult(query, []);
        console.log("User details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "User could not be deleted!" });
    }
}

async function updateUser(userDetails, userID){
    try {
        console.log("Starting...")
        const query = 'UPDATE Users SET ? WHERE id = ' + userID;
        const updateQuery = await mysql.queryResult(query, [userDetails]);

        console.log("User details: ", updateQuery);
        return updateQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "User could not be updated!" });
    }
}

async function getUserByID(userID) {
    try {
        const query = 'SELECT * FROM Users WHERE id = ?';
        const result = await mysql.queryResult(query, [userID]);

        if (result.length === 0) {
            throw { statusCode: 404, message: `User with ID ${userID} not found.` };
        }

        return result[0];
    } catch (error) {
        console.error("Error fetching user details: ", error);
        throw { statusCode: 500, message: "Failed to fetch user details." };
    }
}

module.exports = {
    addUser, deleteUser, updateUser, getUserByID
}