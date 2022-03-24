import db from '../models/index'
import CRUDServices from '../services/CRUDServices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('home.ejs', {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

let getCrudPage = (req, res) => {
    return res.render('crud.ejs')
}

let postCrud = async (req, res) => {
    let result = await CRUDServices.createNewUser(req.body)
    console.log(result);
    return res.send('crud.ejs')

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser()
    console.log("-------------");
    console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data
    }) // passing data into view through dataTable
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if(userId){
        let userData = await CRUDServices.getUserById(userId)
        console.log('-----------------');
        console.log(userData);
        return res.render('editCRUD.ejs', {
            user: userData,
        })
    } else {
        return res.send("User can not be found")
    }
}

let putEditCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDServices.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    }) 
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id
    if(userId){
        await CRUDServices.deleteUserById(userId)
        return res.send('Deleted')
    } else {
        return res.send('Id not found')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCrudPage: getCrudPage,
    postCrud: postCrud,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putEditCRUD: putEditCRUD,
    deleteCRUD: deleteCRUD
}
