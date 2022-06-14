import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
    let limitLoad = req.query.limit;
    if (!limitLoad) limitLoad = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limitLoad);
        return res.status(200).json(response);

    } catch (error) {
        console.log('getTopDoctorHome: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.error("getAllDoctors: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let postDoctorInfo = async (req, res) => {
    try {
        let response = await doctorService.saveDoctorInfoDetail(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.error("postDoctorInfo: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.error("getDetailDoctorByID: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.error("bulkCreateSchedule: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response);
    } catch (error) {
        console.error("getScheduleByDate: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraInforDoctorById(req.query.doctorId, req.query.date);
        return res.status(200).json(response);
    } catch (error) {
        console.error("getExtraInforDoctorById: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(response);
    } catch (error) {
        console.error("getProfileDoctorById: ", error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postDoctorInfo: postDoctorInfo,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
}