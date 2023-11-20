const db = require('./db');


async function getAllHospitals(){
    const query = 'select * FROM Hospital'
    const result = await db.queryResult(query,[])
    return result;
} 


module.exports = {
    getAllHospitals
}