require("dotenv").config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'bwsgurdeepsingh2022@gmail.com',
        pass: 'jzwtgmeudabvgzpm'
    }
});

transporter.use('compile')

async function sendEmail(userEmail, sub, otp) {
    const info = await transporter.sendMail({
        from: `<${'bwsgurdeepsingh2022@gmail.com'}>`,
        to: userEmail,
        subject: sub,
    
        context: {
            otp
        }
    });
    console.log("Message sent: %s", info.messageId);
    if (info.messageId) {
        return true
    }
}
module.exports = {

    send: (userEmail, sub, otp,callBack) => {
        
        try {
            sendEmail(userEmail, sub, otp);
            return res.status(200).json({
				success :200,
				message : 'OTP send sucessfully.'
			});
        }

        catch (e) {
            return callBack(null, e)
        }
    },


};



