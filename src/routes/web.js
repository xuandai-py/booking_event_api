import express from "express";
import { getHomePage, getCrudPage, postCrud, displayGetCRUD, getEditCRUD, putEditCRUD, deleteCRUD } from '../controllers/homeController'
import doctorController from '../controllers/doctorController'
import userController from '../controllers/userController'
import patientController from '../controllers/patientController'
import specialtyController from "../controllers/specialtyController";
let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', getHomePage)
    router.get('/crud', getCrudPage)
    router.post('/post-crud', postCrud)
    router.get('/get-crud', displayGetCRUD)
    router.get('/edit-crud', getEditCRUD)
    router.post('/put-crud', putEditCRUD)
    router.get('/delete-crud', deleteCRUD)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.post('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.getAllCode)

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-doctors-info', doctorController.postDoctorInfo)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    router.post('/api/patient-appointment', patientController.postAppointment)    
    router.post('/api/verify-patient-appointment', patientController.postVerifyAppointment)    
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)    

    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)

    return app.use('/', router)

}

module.exports = initWebRoutes