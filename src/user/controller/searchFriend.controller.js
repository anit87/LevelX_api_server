const {getAll} = require("../services/searchFriend.service");

module.exports ={

	
	searchFriends : (req, res) => { 
		// Validate User Here 
		// Then generate JWT Token 
		const body = req.body;
        if ( body.columnValue == null ||  body.columnValue == undefined || body.userID == null ||  body.userID == undefined){
            return res.status(500).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 500 }
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