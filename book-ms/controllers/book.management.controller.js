const bmService = require('../services/book.management.service')

async function addBookController(req, res) {
    try {
        const bookDetails = req.body
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
        console.log("Starting...")
        const bookID = req.params['id']
        const bookDetails = req.body;
        const updateBook = await bmService.updateBook(bookDetails, bookID);
        return res.status(200).json({ success: "Book updated successfully", data: updateBook })
    } catch (error) {
        console.log("Couldn't add book: ", error)
        return res.status(500).json({ error: "Book could not be updated!" });
    }
}





module.exports = {
    addBookController, deleteBookController, updateBookController
}