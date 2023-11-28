const studentData = require('../services/students.service')


async function allStudents () {
    try {
        const results =  await studentData.getStudents();
        console.log("results from students services",results)
        return results;
    } catch (error) {
        console.log("an error occurred",[error])

        throw error;
    }

}

async function oneStudent (student_id) {
    try {
        const results =  await studentData.getOneStudent(student_id);
        console.log("results from students services",results)
        return results;
    } catch (error) {
        console.log("an error occurred",[error])

        throw error;
    }

}


async function createStudent(studentsData){
    console.log("Student's data: ", studentsData)
    studentsData = await studentData.createStudent(studentsData);
    return studentsData;
}


async function updateStudentController(updateStudent, student_id){
    updateStudent = await studentData.updateStudent(updateStudent, student_id)
    return updateStudent;
}

async function deleteStudentController(student_id){
    deleteStudent = await studentData.deleteStudent(student_id)
    return deleteStudent;
}

module.exports = {
    allStudents,
    oneStudent,
    createStudent,
    updateStudentController,
    deleteStudentController,
}