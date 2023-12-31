const mysql = require('./db')

async function addBorrower(borrowerDetails){
    try {
        console.log("Starting...")
        const query = 'INSERT INTO Borrowers SET ?';
        const insertQuery = await mysql.queryResult(query, [borrowerDetails]);
        console.log("Borrower details: ", insertQuery);
        return insertQuery;
    } catch (error) {
        console.log("Error: ", error)
        throw error;
    }
}

async function deleteBorrower(borrowerID){
    try {
        console.log("Starting...")
        const query = 'DELETE FROM Borrowers WHERE id = ' + borrowerID;
        const deleteQuery = await mysql.queryResult(query, []);
        console.log("Borrower details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.log("Error: ", error)
        throw error;
    }
}

async function updateBorrower(borrowerDetails, borrowerID){
    try {
        console.log("Starting...")
        const query = 'UPDATE Borrowers SET ? WHERE id = ' + borrowerID;
        const deleteQuery = await mysql.queryResult(query, [borrowerDetails]);
        // if (deleteQuery.affectedRows == 0){
        //     return res.status(400).json({error: `No such borrower with id: ${borrowerID}`})
        // }
        console.log("Borrower details: ", deleteQuery);
        return deleteQuery;
    } catch (error) {
        console.error("Error: ", error)
        throw error;
    }
}

module.exports = {
    addBorrower, deleteBorrower, updateBorrower,
}