const mysql = require('./db')

async function addAuthor(authorDetails){
    try {
        console.log("About to add an author (service)...")
        const query = 'INSERT INTO Authors SET ?';
        const insertQuery = await mysql.queryResult(query, [authorDetails]);
        console.log("Author details: ", insertQuery);
        return insertQuery;
    } catch (error) {
        console.log("An error occured adding an author: ", error)
        throw error;
    }
}

async function deleteAuthor(authorID){
    try {
        console.log("About to delete an author (service)...")
        const query = 'DELETE FROM Authors WHERE id = ' + authorID;
        const deleteQuery = await mysql.queryResult(query, []);
        console.log("Author details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("An error occured deleting an author: ", error)
        throw error
    }
}

async function updateAuthor(authorDetails, authorID){
    try {
        console.log("About to update an author (service)...")
        const query = 'UPDATE Authors SET ? WHERE id = ' + authorID;
        const deleteQuery = await mysql.queryResult(query, [authorDetails]);
        console.log("Author details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("An error occured while updating an author: ", error)
        throw error
    }
}

module.exports = {
    addAuthor, deleteAuthor, updateAuthor,
}