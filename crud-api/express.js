const express = require('express');
const app = express();
app.use(express.json());
const studentController = require('./controllers/students.controller')


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
    console.log("Student Data: ", studentsData.DOB)

    try{
        // if(!studentsData.first_name || !studentsData.last_name || !studentsData.Level || !studentsData.DOB || !studentsData.Entry_year){
        //     let missedFields = []
            
        //     if(!studentsData.first_name){
        //         missedFields.push("First name is required")
        //     }

        //     if(!studentsData.last_name){
        //         missedFields.push("Last name is required")
        //     }

        //     if(!studentsData.Level){
        //         missedFields.push("Level is required")    
        //     }

        //     if(!studentsData.DOB){
        //         missedFields.push("DOB is required")
        //     }

        //     if(!studentsData.Entry_year){
        //         missedFields.push("Entry year is required")
        //     }
        //     return res.status(400).json({error: missedFields});
        // }
        const requiredFields = ['first_name', 'last_name', 'Level', 'DOB', 'Entry_year'];
        const missedFields = [];

        requiredFields.forEach(field => {
            console.log("sfkoafoaL : ", field)
            if (!studentsData[field]) {
                // console.log("sfkoafoaL : ", field)
                missedFields.push(`${field} is required`);
            }
        });

        if (missedFields.length > 0) {
            return res.status(400).json({ error: missedFields });
        }

        if((typeof studentsData.first_name != 'string' || !/[a-zA-Z]/.test(studentsData.first_name)) || (typeof studentsData.last_name != 'string' || !/[a-zA-Z]/.test(studentsData.last_name)) 
        || typeof studentsData.Level != 'number' || typeof studentsData.DOB != 'string' || typeof studentsData.Entry_year != 'number'){

            let missedFields = []
            if (typeof studentsData.first_name !== 'string' || !/[a-zA-Z]/.test(studentsData.first_name)) {
                missedFields.push("Invalid first name. Only alphabets are allowed.")
            }

            if (typeof studentsData.last_name !== 'string' || !/[a-zA-Z]/.test(studentsData.last_name)) {
                missedFields.push("Invalid last name. Only alphabets are allowed.")
            }

            if (typeof studentsData.Level !== 'number' || isNaN(studentsData.Level)) {
                missedFields.push("Invalid level. Must be a valid number.")
            }

            if (typeof studentsData.DOB !== 'string') {
                missedFields.push("Date must be valid string")

            }

            if(typeof studentsData.DOB === 'string'){
                if (dateValidate( studentsData.DOB)) {
                    console.log("reccceeeeeeeedddddddd")
                    missedFields.push("Date format must be yyyy-mm-dd")

                    
                }

            }

            if (typeof studentsData.Entry_year !== 'number') {
                missedFields.push("Entry year only accepts numbers.")
            }else if (studentsData.Entry_year < 2020 || studentsData.Entry_year > 2024) {
                missedFields.push("Entry year must be in the range 2020-2024")
            }
            
            
            return res.status(400).json({error: missedFields});

        }

        const details = await studentController.createStudent(studentsData)
        return res.status(200).json({ success: 'Student created successfully', data: details });

    } catch(error) {
        console.log("an error occurred", [error])

        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(400).json({ error: 'Record already exists'});
        }
 
        return res.status(500).json({ errror: 'Internal Server', });
    }
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

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));

function dateValidate(dateInput) {
    console.log("Hi, I'm here!")
    const dobParts = dateInput.split('-');
    console.log("dobparts: ", dobParts);

    if (dobParts.length !== 3 ||
        dobParts[0].length !== 4 ||
        dobParts[1].length !== 2 ||
        dobParts[2].length !== 2 ||
        isNaN(Number(dobParts[0])) ||
        isNaN(Number(dobParts[1])) ||
        isNaN(Number(dobParts[2]))) {
        return true;
    }

    return null; // No validation error
}

// module.exports = {
//     student_id
// }