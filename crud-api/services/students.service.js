const mysql = require('./db')
const expressParam = require('../express')

async function getStudents(){
    console.log("About to retrieve students!")
    const query = 'SELECT * FROM Students'
    const studentsDB = await mysql.queryResult(query,[])
    console.log('List of students', studentsDB)
    return studentsDB;
}

async function getOneStudent(student_id){
    console.log("About to retrieve one student!")
    // var student_id = req.params['id']
    const query = 'SELECT * FROM Students  WHERE student_id = ' + student_id;
    console.log("This is the query...", query)
    const studentsDB = await mysql.queryResult(query,[])
    console.log("Student's details", studentsDB)
    return studentsDB;
}

async function createStudent(studentsData){
    console.log("About to create a student!", studentsData)
    // const {first_name, last_name, Level, DOB, Entry_year} = studentsData;
    console.log("Service Student data: ", studentsData)
    const query = 'INSERT INTO Students SET ?';
    const record = await mysql.queryResult(query, [studentsData])
    const latestRecordQuery = 'SELECT * FROM Students ORDER BY student_id DESC LIMIT 1';
    const latestRecord = await mysql.queryResult(latestRecordQuery, []);
    console.log("Records: ", record)
    return latestRecord;

}

async function updateStudent(updateData, student_id) {
    console.log("About to update student!")
    const query = 'UPDATE Students SET ? WHERE student_id = ' + student_id;
    let record = await mysql.queryResult(query, [updateData])
    return record;
}

async function deleteStudent(student_id) {
    console.log("About to delete student")
    const query = 'DELETE from Students WHERE student_id = ' + student_id;
    deleteStudent = await mysql.queryResult(query, [])
    return deleteStudent;
}

async function firstNameValid(firstName){
    let validResponse = null
    if (!firstName){
        validResponse = 'First name is required'
        return validResponse;
    }
    if (typeof firstName !== 'string' || !/[a-zA-Z]/.test(firstName )) {
        validResponse = 'Invalid first name. Only alphabets are allowed.'
        return validResponse;
    }
    
}

async function lastNameValid(lastName){
    let validResponse = ''
    if (!lastName){
        validResponse = 'Last name is required'
    }
    if (typeof lastName !== 'string' || !/[a-zA-Z]/.test(lastName )) {
        validResponse = 'Invalid last name. Only alphabets are allowed.'
    }
    return validResponse;
}

async function levelValid(level){
    let validResponse = ''
    if (!level){
        validResponse = 'Level is required'
    }
    if (typeof level !== 'string' || !/[a-zA-Z]/.test(level)) {
        validResponse = 'Invalid level. Must be a valid number.'
    }
    console.log("Service Valid response: ", validResponse);
    return validResponse;
}

module.exports = {
    getStudents, getOneStudent, createStudent, updateStudent, deleteStudent,
    firstNameValid, lastNameValid, levelValid
}