import express from "express";
import { getHomePage, getCrudPage, postCrud, displayGetCRUD, getEditCRUD, putEditCRUD, deleteCRUD } from '../controllers/homeController'
import doctorController from '../controllers/doctorController'
import userController from '../controllers/userController'

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


    return app.use('/', router)

}

module.exports = initWebRoutes