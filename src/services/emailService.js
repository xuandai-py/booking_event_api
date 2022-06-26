require('dotenv').config()
const nodemailer = require("nodemailer");

let sendEmail = async (data) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP_US, // generated ethereal user
            pass: process.env.EMAIL_APP, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <buinguyenxuandai@gmail.com>', // sender address
        to: data.receiver, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(data)
    });

}
let getBodyHTMLEmail = (data) => {
    let response = ''
    if (data.language === 'vi') {
        response = `
        <h3>Xin chao, ${data.patientName}</h3>
        <p>This email is a notification for your helth check appointment on bookingcare.com</p>
        <p>Your appoitment detail:</p>
        <div><b>Time: ${data.time}</b></div>
        <div><b>Time: ${data.doctorName}</b></div>

        <p>Plese confirm your booking detail above then click on the link below to confirm your book</p>
        <div>
            <a href="${data.redirectLink} target="_blank">Click here</a>
        </div>
    `
    }
    
    if (data.language === 'en') {
        response = `
        <h3>Hello, ${data.patientName}</h3>
        <p>This email is a notification for your helth check appointment on bookingcare.com</p>
        <p>Your appoitment detail:</p>
        <div><b>Time: ${data.time}</b></div>
        <div><b>Time: ${data.doctorName}</b></div>
        <p>Plese confirm your booking detail above then click on the link below to confirm your book</p>
        <div>
            <a href="${data.redirectLink} target="_blank">Click here</a>
        </div>
    `
    } 

    return response
}

let getBodyHTMLEmailBill = (data) => {
    let response = ''
    if (data.language === 'vi') {
        response = `
        <h3>Xin chao, ${data.patientName}</h3>
        <p>This email is a notification for your helth check appointment on bookingcare.com</p>
        <p>Your appoitment detail:</p>
        <div><b>Time: ${data.time}</b></div>
        <div><b>Doctor: ${data.doctorName}</b></div>
        <p>Your appoitment has been confirmed successfully. The appointment charges would be plug in file</p>
        
    `
    }
    
    if (data.language === 'en') {
        response = `
        <h3>Hello, ${data.patientName}</h3>
        <p>This email is a notification for your helth check appointment on bookingcare.com</p>
        <p>Your appoitment detail:</p>
        <div><b>Time: ${data.time}</b></div>
        <div><b>Doctor: ${data.doctorName}</b></div>
        <p>Your appoitment has been confirmed successfully. The appointment charges would be plug in file</p>
    `
    } 

    return response
}


let sendAttachment = async  (data) => {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP_US, // generated ethereal user
            pass: process.env.EMAIL_APP, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <buinguyenxuandai@gmail.com>', // sender address
        to: data.receiver, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmailBill(data),
        attachments: [
            {
                filename: `appointment-${data.patientId}-${data.patientName}.png`,
                content: data.imageBase64.split("base64,")[1],
                encoding: `base64`
            }
        ]
    });

}

module.exports = {
    sendEmail: sendEmail,
    sendAttachment: sendAttachment,
}