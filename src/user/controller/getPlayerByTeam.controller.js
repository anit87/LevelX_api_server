const {getAll} = require("../services/getPlayerByTeam.service");

module.exports ={

	searchPlayers : (req, res) => { 

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
                PlayerList : results[0]
            });
    	});
	  
	},
	
}