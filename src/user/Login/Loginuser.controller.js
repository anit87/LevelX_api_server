const {getID,verifyOTP,AfterOTP} = require("./Loginuser.service");

const jwt = require('jsonwebtoken');
require("dotenv").config()

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.System,
        pass: 'jzwtgmeudabvgzpm'
    }
});

function sendEmail(userEmail, sub, otp) {
	if (!userEmail) {
        console.error('Recipient email is missing.');
        return false;
    }
    const mailOptions = {
        from: `<${process.env.System}>`,
        to: userEmail,
        subject: `Lexel X OTP`,
        html: `     <h1 style="color:gray;">Hi :   ${sub}  </h1></br> <hr>
		            <h2>Your OTP is : ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return false; 
        }
        console.log("Email sent: %s", info.messageId);
        return true; 
    });
}


var otp='';
module.exports ={

    verifyToken:(req,res)=>{
		const body = req.body;
				try { 
				if(body.otp >0)
				{
					verifyOTP(body.ID,body.otp,(err,results) => {
						if(err){
							console.log(err);
							return res.status(500).json ({
								success :0,
								message:err
							});
						}
						if(body.otp ==results[0][0].OTP){
						let jwtSecretKey = process.env.JWT_SECRET_KEY; 
						
						 let data = { 
						time: Date(), 
						userName:results[0][0].FullName,
						userGuid:results[0][0].UserGuid,
						userID:results[0][0].UserID
						 } 
						 const token = jwt.sign(data, jwtSecretKey); 
						 AfterOTP(body.ID,body.otp,(err,results) => {
							if(err){
								console.log(err);
								return res.status(500).json ({
									success :0,
									message:"DB conn error"
								});
							}
						});

						return res.status(200).json({
							success :200,
							token : token
						
						});
							
						}
						else{
							return res.status(200).json({
								success :201,
								Message : 'Invalid OTP.'});
						}
					})
				}
				else{
					return res.status(200).json({
						success :201,
						Message : "Invalid OTP"
					});
			   } 
			}
			catch (error) { 
				return res.status(401).send(error); 
			} 
		
	},
	GernateToken : (req, res) => { 
		
		const body = req.body;
		getID(body.ID,(err,results) => {
			if(err){
				console.log(err);
				return res.status(500).json ({
					success :0,
					message:"DB conn error"
				});
			}
	
			if(results[0][0]!={} && results[0][0]!=undefined && results[0][0]!=null && results[0][0].OTP !=undefined &&  results[0][0].OTP !=''){
			let jwtSecretKey = process.env.JWT_SECRET_KEY; 
		     let data = { 
			time: Date(), 
			userEmail: body.id, 
			userName:results[0][0].FullName,
			userGuid:results[0][0].UserGuid,
			name:results[0][0].OTP
		     } 
			 const token = jwt.sign(data, jwtSecretKey); 
			 otp='';
			 otp=results[0][0].OTP;
			 sendEmail(body.ID, results[0][0].FullName, results[0][0].OTP);
			return res.status(200).json({
				success :200,
				message : 'OTP send sucessfully.'
			});
			
			}
			else{
				return res.status(200).json({
					success :201,
					message : "Invalid User cardential"
				});
		}
		});
		
		  
	},
	Gernate : (req, res) => { 
		// Validate User Here 
		// Then generate JWT Token 
		const body = req.body;
		if(body.ID==undefined && body.Password==undefined && body.ID==null && body.Password==null)
		{
			return res.status(400).send({error:'Parameter error.'});
		}
		try { 
			if(body.ID=='Test' && body.Password=='1234567')
			{
				let jwtSecretKey =process.env.JWT_SECRET_KEY;
				let data = { 
					time: Date(), 
					userId: body.id, 
					Name:'Test'
					 } 
					 const token = jwt.sign(data, jwtSecretKey); 
					return res.status(200).json({
						success :200,
						token : token,
					});
			}
			else{ 
			
				return res.status(401).send({error:'Invalid user.'}); 
			} 
		} catch (error) { 
			// Access Denied 
			return res.status(401).send(error); 
		} 
	},
	
}