import db from '../models/index'
import bcryptjs from 'bcryptjs'

const salt = bcryptjs.genSaltSync(10)

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {

                // needed to check user exists or not
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                    attributes: ['email', 'password', 'firstName', 'lastName', 'address', 'roleId'], // defind visable columns <> 
                })
                if (user) {
                    console.log("user loged in: ", user);
                    let check = await bcryptjs.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'Checked password'
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = 'User can not be found'
                }

            } else {
                // return error
                userData.errCode = 1
                userData.errMessage = 'Email (username) is invalid'
            }
            resolve(userData)
        } catch (error) {

        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleGetAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'All') {
                users = await db.User.findAll({
                    // mark ++--//
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId != 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
            console.log(users);
        } catch (error) {
            reject(error)
        }
    })
}

let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkBeforeCommit = await checkUserEmail(data.email)
            if (checkBeforeCommit === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email is already existed"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: hashPasswordFromBcrypt,
                    email: data.email,
                    address: data.address,

                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    phoneNumber: data.phoneNumber,
                    image: data.image
                })
                resolve({ errCode: 0, message: 'OK' })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcryptjs.hashSync(password, salt)
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}

let handleEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errcode: 2,
                    message: "Missing required parameters"
                })
            }


            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                if (data.image) {
                    user.image = data.image;
                }
                await user.save()

                resolve({
                    errCode: 0,
                    message: 'User updated successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "User can not be found"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleDeleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exist'
                })
            }
            await await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                message: 'User deleted'
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {

                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCodeService: getAllCodeService,
}