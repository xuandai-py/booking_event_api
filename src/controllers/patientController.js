import patientService from '../services/patientService'

let postAppointment = async (req, res) => {

        try {
            let response = await patientService.postAppointment(req.body);
            return res.status(200).json(response);
        } catch (error) {
            console.error("postAppointment: ", error);
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server'
            })
        }
    
}

let postVerifyAppointment = async (req, res) => {

        try {
            let response = await patientService.postVerifyAppointment(req.body);
            return res.status(200).json(response);
        } catch (error) {
            console.error("postVerifyAppointment: ", error);
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server'
            })
        }
    
}



module.exports = {
    postAppointment: postAppointment,
    postVerifyAppointment: postVerifyAppointment,
}