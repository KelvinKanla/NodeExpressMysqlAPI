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

module.exports = {
    addBook, deleteBook, updateBook,
}