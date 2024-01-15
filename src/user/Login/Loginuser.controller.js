const {getID} = require("./Loginuser.service");
const jwt = require('jsonwebtoken');
var otp='';
module.exports ={

    verifyToken:(req,res)=>{
		const body = req.body;
		console.log(body,"id")
			try { 
				if(body.otp='1234')
				{
					getID(body.ID,(err,results) => {
						if(err){
							console.log(err);
							return res.status(500).json ({
								success :0,
								message:"DB conn error"
							});
						}
						console.log(results[0][0])
						if(results[0][0]!={} && results[0][0]!=undefined && results[0][0]!=null ){
						let jwtSecretKey = process.env.JWT_SECRET_KEY; 
						
						 let data = { 
						time: Date(), 
						userName:results[0][0].FullName,
						userGuid:results[0][0].UserGuid,
						userID:results[0][0].UserID
						 } 
						 const token = jwt.sign(data, jwtSecretKey); 
						 otp='';
						 otp=results[0][0].OTP;

						return res.status(200).json({
							success :200,
							token : token
						
						});
							
						}
						else{
							return res.status(200).json({
								success :201,
								token : ''});
						}
					})
				}
				else{
					return res.status(200).json({
						success :201,
						token : "Invalid User cardential"
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
	
			if(results[0][0]!={} && results[0][0]!=undefined && results[0][0]!=null ){
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
			return res.status(200).json({
				success :200,
				token : 'OTP send sucessfully.'
			});
				
			}
			else{
				return res.status(200).json({
					success :201,
					token : "Invalid User cardential"
				});
		}
		});
		
		
	
		  
	},
	
}