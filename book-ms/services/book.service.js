const mysql = require('./db')

async function addBook(bookDetails){
    try {
        console.log("Starting...")
        const query = 'INSERT INTO Books SET ?';
        const insertQuery = await mysql.queryResult(query, [bookDetails]);
        console.log("Book details: ", insertQuery);
        return insertQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "Book could not be added!" });
    }
}

async function deleteBook(bookID){
    try {
        console.log("Starting...")
        const query = 'DELETE FROM Books WHERE id = ' + bookID;
        const deleteQuery = await mysql.queryResult(query, []);
        console.log("Book details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "Book could not be deleted!" });
    }
}

async function updateBook(bookDetails, bookID){
    try {
        console.log("Starting...")
        const query = 'UPDATE Books SET ? WHERE id = ' + bookID;
        const deleteQuery = await mysql.queryResult(query, [bookDetails]);
        console.log("Book details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "Book could not be updated!" });
    }
}

module.exports = {
    addBook, deleteBook, updateBook,
}