const {getAll} = require("../services/groupType.service");

module.exports ={

	
	groupType : (req, res) => { 
 
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
                GroupTypeList : results[0]
            });
    	});
	  
	},
	
}