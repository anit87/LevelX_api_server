const {SaveMatchFinshService} = require("../services/MetchFinish.service");
module.exports={
    saveMatchFinshRouter:(req,res)=>
    {
        const matchList = req.body;
  
        var validateitem =["MatchId","TournamentId", "MatchFinish","UpdatedBy"];
       var check = validateitem.filter(x=>[null,undefined,''].includes(matchList[x] ))
       if(check.length>0){
        return res.status(500).json ({
            success :0,
            error:{ Message: "Undefined or null parameter error", Status: 500 }
        }); 
       }
         
        SaveMatchFinshService(matchList, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 500,
                        message: JSON.stringify(err)
                    });
                }
                return res.status(200).json({
                    success: 200,
                    message: results[0]
                });
            });
         
    
    },
}