const mysql = require('./db')

async function addAuthor(authorDetails){
    try {
        console.log("Starting...")
        const query = 'INSERT INTO Authors SET ?';
        const insertQuery = await mysql.queryResult(query, [authorDetails]);
        console.log("Author details: ", insertQuery);
        return insertQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "Author could not be added!" });
    }

}

async function deleteAuthor(authorID){
    try {
        console.log("Starting...")
        const query = 'DELETE FROM Authors WHERE id = ' + authorID;
        const deleteQuery = await mysql.queryResult(query, []);
        console.log("Author details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "Author could not be deleted!" });
    }
}

async function updateAuthor(authorDetails, authorID){
    try {
        console.log("Starting...")
        const query = 'UPDATE Authors SET ? WHERE id = ' + authorID;
        const deleteQuery = await mysql.queryResult(query, [authorDetails]);
        console.log("Author details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: "Author could not be updated!" });
    }
}

module.exports = {
    addAuthor, deleteAuthor, updateAuthor,
}