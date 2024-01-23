const pool = require("../../../config/database")


module.exports={
    create:(data,callBack) =>{
        //console.log("list data",data)
        if( ( data.PlayerID == null ||
            data.FirstName == null ||
            data.LastName == null ||
            data.NickName == null ||
            data.CountryId == null ||
            data.TeamID == null ||
            data.CreatedBy == null ||
            data.UpdatedBy  == null
            ) || 
            ( data.PlayerID == undefined ||
                data.FirstName == undefined ||
                data.LastName == undefined ||
                data.NickName == undefined ||
                data.CountryId == undefined ||
                data.TeamID == undefined ||
                data.CreatedBy == undefined ||
                data.UpdatedBy == undefined)  )
        {
            return callBack({Message:"Undefined or null parameter error",Status:201})
        }
        try {
            var s, m;
            pool.query(
                'CALL SaveUpdate_Player(?, ?, ?, ?, ?, ?, ?, ?, @?, @?)',
                [
                    data.PlayerID,
                    data.FirstName,
                    data.LastName,
                    data.NickName,
                    data.CountryId,
                    data.TeamID,
                    data.CreatedBy,
                    data.UpdatedBy,
                    s,
                    m
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    
                    return callBack(null, results);
                }
            );
        } catch (err) {
            // This block will not capture asynchronous errors from pool.query
            console.error('Caught synchronous error:', err);
            return callBack(err);
        }
    },
    get:(data,callBack) =>{
       
        pool.query(`call getAll_Player()`,
        [],
        (error,results,fields)=>{
            try{

            
            if(error){
                callBack(error);

            }
       // console.log("list",results[0])
       
            return callBack(null,results)
        }
        catch(e){
            
            return null;
        }
        }

        );
    },
    getByID:(ID,callBack) =>{
        
        pool.query(`call getBy_PlayerID(`+ID+`)`,
        [],
        (error,results,fields)=>{
            try{

            
            if(error){
                callBack(error);

            }
        
            return callBack(null,results)
        }
        catch(e){
            
            return null;
        }
        }

        );
    },
    deleteTeamId:(ID,callBack) =>{
        
        pool.query(`call Delete_Player(`+ID+`)`,
        [],
        (error,results,fields)=>{
            try{

            
            if(error){
                callBack(error);

            }
        
            return callBack(null,results)
        }
        catch(e){
            
            return null;
        }
        }

        );
    }

   
};