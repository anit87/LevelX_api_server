const pool = require("../../../config/database")


module.exports={
    SaveMatchFinshService:(data,callBack) =>{
    
        var s,m;
        pool.query(`call Match_Finish(?,?,?,?)`,
        [data.MatchId,data.TournamentId, data.MatchFinish,data.UpdatedBy],
        (error,results,fields)=>{
            if(error){
                callBack(error);

            }
            
            return callBack(null,results)
        }

        );
    },
}