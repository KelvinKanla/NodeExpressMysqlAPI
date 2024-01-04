const mysql = require('./db')

async function addBook(bookDetails){
    try {
        console.log(`About to add a book request (service)...`)
        const query = 'INSERT INTO Books SET ?';
        const insertQuery = await mysql.queryResult(query, [bookDetails]);
        console.log("Book details: ", insertQuery);
        return insertQuery;
    } catch (error) {
        console.log("Error: ", error)
        console.error("An error occured while adding a book..", error)
        throw error;
    }
}

async function deleteBook(bookID){
    try {
        console.log(`About to delete a book request, bookID - ${bookID} (service)...`)
        const query = 'DELETE FROM Books WHERE id = ' + bookID;
        const deleteQuery = await mysql.queryResult(query, []);
        console.log("Book details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.error("An error occured while deleting a book..", error)
        throw error;
    }
}

async function updateBook(bookDetails, bookID){
    try {
        console.log(`About to update a book request, bookID - ${bookID} (service)...`)
        const query = 'UPDATE Books SET ? WHERE id = ' + bookID;
        const deleteQuery = await mysql.queryResult(query, [bookDetails]);
        console.log("Book details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.error("An error occured while updating a book..", error)
        throw error;
    }
}

async function getBookByID(bookID) {
    try {
        const query = 'SELECT * FROM Books WHERE id = ?';
        const result = await mysql.queryResult(query, [bookID]);

        if (result.length === 0) {
            throw { statusCode: 404, message: `Book with ID ${bookID} not found.` };
        }

        return result[0];
    } catch (error) {
        console.error("Error fetching book details: ", error);
        throw { statusCode: 500, message: "Failed to fetch book details." };
    }
}

module.exports = {
    addBook, deleteBook, updateBook, getBookByID
}