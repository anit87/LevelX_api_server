const {getAll} = require("../services/gameType.service");

module.exports ={

	
	gameType : (req, res) => { 
		// Validate User Here 
		// Then generate JWT Token 
		const body = req.body;
		getAll(body,(err,results) => {
			if(err){
                console.log(err);
                return res.status(500).json ({
                    success :0,
                    message:err
                });
            }
            return res.json({
                success :200,
                GameTypeList : results[0]
            });
    	});
	  
	},
	
}