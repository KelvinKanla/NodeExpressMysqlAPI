const mysql = require('mysql2/promise');
// create the connection to database

async function queryResult(query, arg) {
    

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Alnak123',
        database: 'book_management_system'
      });

      const [rows, fields ] = await connection.query(
        query, arg
      )
    
      console.log("We have connected to the database!", rows)
      return rows
}

module.exports = {
    queryResult
}