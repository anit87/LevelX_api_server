const pool = require("../../../config/database")
module.exports={
    SaveUpdateMatchService:(data,callBack) =>{
        try {
            var s, m;
            if((data.MatchId == null || data.TournamentId == null || data.TeamId1 == null || data.TeamId2 == null ||
                data.MatchDate == null ||data.MatchTime == null ||data.Team1Score == null || data.Team2Score == null ||
                data.BestOf == null || data.CreatedBy == null || data.UpdatedBy == null  ) ||
                data.MatchId == undefined || data.TournamentId == undefined || data.TeamId1 == undefined || data.TeamId2 == undefined ||
                    data.MatchDate == undefined ||data.MatchTime == undefined ||data.Team1Score == undefined || data.Team2Score == undefined ||
                    data.BestOf == undefined || data.CreatedBy == undefined || data.UpdatedBy == undefined || data.YoutubeURL == undefined || data.Camera_1URL == undefined || data.Camera_2URL== undefined || data.Camera_3URL == undefined ||
                    data.Camera_4URL== undefined  )
                    {
                        return callBack({Message:"Undefined or null parameter error",Status:201})
                    }
            pool.query(
                'CALL SaveUpdate_Matches(?, ?, ?, ?, ?,?, ?, ?, ?,?,?,?,?,?, ?, ?, @?, @?)',
                [
                    data.MatchId, data.TournamentId, data.TeamId1, data.TeamId2,
                    data.MatchDate,data.MatchTime,data.Team1Score, data.Team2Score,
                    data.BestOf,data.YoutubeURL, data.Camera_1URL, data.Camera_2URL,data.Camera_3URL,
                    data.Camera_4URL,data.CreatedBy, data.UpdatedBy, s, m
                ],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    } else {
                        callBack(null, results);
                    }
                }
            );
        } catch (err) {
            callBack(err);
        }
    },
    GetSingleFormservice:(MatchId,callBack) =>{
    var id = "'"+MatchId+"'"
        console.log(MatchId,"data")
	try{
         pool.query(`call GetSingleFormUpdatematch(`+id+`)`,
         [],
         (error,results,fields)=>{
             
 
             
             if(error){
                 callBack(error.message);
 
             }
         console.log("Tournamentlist",results[0])
        
             return callBack(null,results)
         
         }
 
         );
	}
         catch(e){
             
             return e.message;
         }
     },
 
    GetAllservice:(data,callBack) =>{
        var s,m;
            try{
        pool.query(`call GetAllMatches(@?,@?)`,
        [s,m],
        (error,results,fields)=>{


            
            if(error){
                callBack(error);

            }
        //console.log("list",results[0])
       
            return callBack(null,results)
        }

        );
 }
        catch(e){
            
            return e;
        }
    },

    GetSingleservice:(p_MatchId,callBack) =>{
        var id = "'"+p_MatchId+"'"
 	try{
        pool.query(`call GetSingleMatches(`+id+`)`,
        [],
        (error,results,fields)=>{
           

            
            if(error){
                callBack(error);

            }
        //console.log("Singlelist",results[0])
       
            return callBack(null,results)
        
        }

        );
	}
        catch(e){
            
            return e;
        }
    },

    DeleteMatchService:(MatchId,callBack) =>{
        var s,m;
	var id = "'"+p_MatchId+"'"
	 try{

        pool.query(`call deleteMatches(`+MatchId+`)`,
        [],
        (error,results,fields)=>{
           
            
            if(error){
                callBack(error);

            }
        
            return callBack(null,results)
       
        }

        );
	 }
        catch(e){
            
            return e;
        }
    }

};