const {getAll} = require("../services/searchAccptedFriend.service");

module.exports ={

	
	searchFriends : (req, res) => { 
	 
		const body = req.body;
        if ( body.columnValue == null ||  body.columnValue == undefined || body.userID == null ||  body.userID == undefined){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
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
                friendsList : results[0]
            });
    	});
	  
	},
	
}