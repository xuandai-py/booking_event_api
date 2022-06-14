import db from '../models/index'
import { sendEmail } from './emailService'
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()

let buildUrlEmail = (doctorId,token) => {
    
    let result = `${process.env.URL}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result

}

let postAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {


                let token = uuidv4();

                await sendEmail({
                    receiver: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email,
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                       
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor success!!!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


let postVerifyAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                console.log(data);
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1'
                    },
                    raw: false
                })

                console.log('-----------------------------');
                console.log(appointment);
                console.log('-----------------------------');

                if (appointment) {
                    appointment.statusId= 'S2'
                    await appointment.save();

                    
                    resolve({
                        errCode: 0,
                        errMessage: 'Update success!!!'
                    })
                } else {

                    resolve({
                        errCode: 2,
                        errMessage: 'Invalid appointment or does not exist!!!'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    postAppointment: postAppointment,
    postVerifyAppointment: postVerifyAppointment,
}