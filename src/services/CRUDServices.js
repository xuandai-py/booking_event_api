import bcryptjs from 'bcryptjs'
import db from '../models/index'

const salt = bcryptjs.genSaltSync(10)

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashPasswordFromBcrypt,
                email: data.email,
                address: data.address,

                gender: data.gender === '1' ? true : false,
                roleId: data.role,
                image: data.image,
                phoneNumber: data.phonenumber,
            })
            resolve('--> created user successfully')
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })

            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            }
            )

            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.roleId = data.roleid
                await user.save()
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                user.destroy()
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}