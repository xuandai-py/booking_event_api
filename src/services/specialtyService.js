import db from '../models/index'

let createSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML,
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Ok'

                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
               })
            }
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
}