const express = require('express');
const app = express();
app.use(express.json());
const studentController = require('./controllers/students.controller')

const hospitalController = require('./controllers/hospital.controller')

app.get('/students', async (req,res)=>{

console.log("request from server",req);
const results = await studentController.allStudents();

return res.status(200).json({message: "successs",data: results});
})


app.get('/', (req, res)=>{
    console.log("request from server", req);
    
    const {query} = req
    console.log("request from server",query);
    return res.status(200).json({message: "new successs 200"});
})


app.get('/students/:id', async (req, res) => {
    console.log("Request individual student", req);
    let student_id = req.params['id']
    console.log("User ID is this:...", student_id);
    const results = await studentController.oneStudent(student_id);
    return res.status(200).json({message: "Got student successfully", data: results});
})


app.post('/student/create', async (req, res) => {
    // console.log('Creating a student', req)
    let studentsData = req.body
    console.log("Student Data: ", studentsData)
    const details = await studentController.createStudent(studentsData)

    return res.status(200).json({ success: 'Student created successfully', data: details });
})

app.put('/students/update/:id', async (req, res) => {
    let updateStudentData = req.body
    let student_id = req.params['id']
    const details = await studentController.updateStudentController(updateStudentData, student_id)
    return res.status(200).json({ success: 'Student updated successfully', data: details })

})

app.delete('/students/delete/:id', async (req, res) => {
    let student_id = req.params['id']
    const deleteStudent = await studentController.deleteStudentController(student_id)
    return res.status(200).json({ success: 'Student deleted successfully', data: deleteStudent})
})

app.get('/hospitals', async (req, res) => {
    console.log(req)
    const hos = await hospitalController.getAllHospitalsController();
    return res.status(200).json({success: 'GOT ALL HOSPITALS', data: hos});
})

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));

// module.exports = {
//     student_id
// }