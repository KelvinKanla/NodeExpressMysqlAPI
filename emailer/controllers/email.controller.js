const { response } = require('express');
const emailHelper = require('../helpers/email.helper')
const axios = require('axios');

async function drsHelper(clientEmail) {
    const response = await emailHelper.drsHelper(clientEmail);
    return response;
}

async function sendEmail(req, res){
    const clientEmail = req.body.clientEmail
    // console.log("Send mail in controller folder running...")
    let emailValidCheck = await emailValid(clientEmail)
    
    try {
        
        if (emailValidCheck=== true) {
            console.log("Email is valid!");
        } else if(emailValidCheck) {
            return res.status(400).json({ error: emailValidCheck});
        }
        const requestData = await emailHelper.sendEmailHelper(clientEmail)
        const emailResponse = await axios.post("https://apisuat.itcsrvc.com/messaging/send-message",requestData);
        // console.log("emailResponse body: ", emailResponse.message)
        return res.status(200).json({message: 'Email sent successfully', response: emailResponse.body});
        // return response;

    } catch (error) {
        console.log("Couldn't send: ", error)
        return res.status(500).json({ error: "Email couldn't be sent."});
    }
}

async function emailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validResponse = true;
  
    console.log("Email: ", email);
  
    if (!email) {
      console.log('Email is required');
      validResponse = { error: "Email is required" };
    } else if (!emailRegex.test(email)) {
      console.log('Email is invalid. Must be in the form somename@domain.com');
      validResponse = { error: "Email is invalid. Must be in the form somename@domain.com" };
    }
  
    return validResponse;
}

module.exports = {
    drsHelper, sendEmail
}


