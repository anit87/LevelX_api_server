const {getAll} = require("../services/country.service");

module.exports ={

	
	getCountry : (req, res) => { 
		// Validate User Here 
		// Then generate JWT Token 
		const body = req.body;
		getAll(body.id,(err,results) => {
			if(err){
                console.log(err);
                return res.status(500).json ({
                    success :0,
                    message:err
                });
            }
            return res.json({
                success :200,
                countryList : results[0]
            });
    	});
	  
	},
	
}