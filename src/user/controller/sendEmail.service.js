require("dotenv").config()
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'bwsgurdeepsingh2022@gmail.com',
        pass: 'jzwtgmeudabvgzpm'
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

async function sendEmail(userEmail, sub, otp) {
    const info = await transporter.sendMail({
        from: `<${'bwsgurdeepsingh2022@gmail.com'}>`,
        to: userEmail,
        subject: sub,
        //template: 'resetPasswordTemplate', // the name of the template file i.e email.handlebars
        context: {
            otp
        }
    });
    console.log("Message sent: %s", info.messageId);
    if (info.messageId) {
        return true
    }
}

module.exports = { sendEmail }