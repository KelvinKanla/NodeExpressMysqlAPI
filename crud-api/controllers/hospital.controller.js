const service = require('../services/hospitals.service')




async function getAllHospitalsController(){
    try {
        const hospitals = await service.getAllHospitals(); 
        console.log("results from students services",hospitals)
        return hospitals;
    } catch (error) {
        console.log("an error occurred",[error])

        throw error;
    }
    
}

module.exports = {
    getAllHospitalsController
}