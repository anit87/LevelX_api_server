const {getAll} = require("../services/allFriends.service");

module.exports ={

	
	getFriends : (req, res) => { 
		const ID = req.params.ID;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined || ID.trim === '' || isNaN(ID)){
            //console.log(ID,'in')
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
        }
		getAll(ID,(err,results) => {
			if(err){
                console.log(err);
                return res.status(500).json ({
                    success :0,
                    message:err
                });
            }
            return res.json({
                success :200,
                SentRequest_List : results[0],
		ReciveRequest_List : results[1]
            });
    	});
	  
	},
	
}