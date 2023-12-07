const express = require('express');

const app = express();
app.use(express.json());
const port = 3200;
const nodemailer = require("nodemailer");

const emailController = require('./controllers/email.controller')



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kzangu@itconsortiumgh.com', 
        pass: 'tblc ghbs mgqi sfve' 
    }
});

app.post('/', (req, res) => {
    const { to, subject} = req.body;

    const htmlTemplate = fs.readFileSync('index.html', 'utf-8');

    const mailOptions = {
        from: 'testitc024@gmail.com',
        to,
        subject,
        html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error: ", error)
            return res.status(500).json({ error: "Email couldn't be sent."});
        }

        res.status(200).json({ message: 'Email sent successfully', info });
    });
});

// app.post('/sendMail', async (req, res) =>  {
//     const emailMessage = fs.readFileSync('index.html', 'utf-8');
//     const clientEmail = req.body.clientEmail;
//     console.log("ClientEmail:..... ", clientEmail)

//     const requestData = {
//         traceId: uuidv4(),
//         sendingMethod: 'e-mail',
//         source: 'transflow-checkout-service',
//         details: {
//             subject: 'Test Email',
//             msg: emailMessage,
//         },
//         control: {
//             recipients: [clientEmail],
//         },
//     };

//     try {
//         const response = await axios.post("https://apisuat.itcsrvc.com/messaging/send-message",requestData);
//         console.log("Response: ", response);
//         res.status(200).json({ message: 'Email sent successfully' });

//     } catch (error) {
//         console.log("Response: ", error);
//         return res.status(500).json({ error: "Email couldn't be sent."});
//     }


// });

app.post('/sendMail', async (req, res) => {   
    try {
        const clientEmail = req.body.clientEmail;
        const emailResponse = await emailController.drsHelper(clientEmail);
        console.log("Email response: ", emailResponse)
        return res.status(200).json({message: 'Email sent successfully', response: emailResponse});
    } catch (error) {
        console.log("Couldn't send: ", error)
        return res.status(500).json({ error: "Email couldn't be sent."});
    }
})

app.post('/send', emailController.sendEmail)

app.listen(port, () => {
  console.log(`Emailer server started on port ${port}`);
});


