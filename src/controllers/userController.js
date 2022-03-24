import userService from '../services/userService'

let handleLogin = async(req, res) => {

    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json(
            {
                errCode: 1,
                errMessage: 'Missing inputs parameter'
            }
        )
        
    }

    let userData = await userService.handleUserLogin(email, password)
    console.log('Check user info: ', userData);


    return res.status(200).json(
        {
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {}
        }
    )
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id // all - id

    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Param required',
            data: []
        })    
    }
    let users = await userService.handleGetAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let newUserResult = await userService.handleCreateNewUser(req.body)
    console.log(newUserResult);
    return res.status(200).json(newUserResult)
}

let handleEditUser = async (req, res) => {
    
    let message = await userService.handleEditUser(req.body)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
    }

    let message = await userService.handleDeleteUser(req.body.id)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        console.error('Get all code: ', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode,
}