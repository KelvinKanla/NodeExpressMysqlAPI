const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const fs = require('fs');
async function drsHelper (clientEmail) {
    const emailMessage = fs.readFileSync('index.html', 'utf-8');

    const requestData = {
        traceId: uuidv4(),
        sendingMethod: 'e-mail',
        source: 'transflow-checkout-service',
        details: {
            subject: 'Test Email',
            msg: emailMessage,
        },
        control: {
            recipients: [clientEmail],
        },
    };

    try {
        const response = await axios.post("https://apisuat.itcsrvc.com/messaging/send-message",requestData);
        return response;

    } catch (error) {
        throw error;
    }
}

async function sendEmailHelper (clientEmail) {
    const emailMessage = fs.readFileSync('index.html', 'utf-8');

    const requestData = {
        traceId: uuidv4(),
        sendingMethod: 'e-mail',
        source: 'transflow-checkout-service',
        details: {
            subject: 'Test Email',
            msg: emailMessage,
        },
        control: {
            recipients: [clientEmail],
        },
    };

    return requestData;

}

async function emailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validResponse = true;
  
    console.log("Email: ", email);
  
    if (!email) {
      console.log('Email is required');
      validResponse = "Email is required";
    } else if (!emailRegex.test(email)) {
      console.log('Email is invalid. Must be in the form somename@domain.com');
      validResponse = "Email is invalid. Must be in the form somename@domain.com" ;
    }
  
    return validResponse;
}

module.exports = {
    drsHelper, sendEmailHelper, emailValid
}