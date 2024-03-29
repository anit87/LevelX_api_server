const pool = require("../../../config/database")
module.exports={
    create:(data,callBack) =>{
        console.log("list data",data)
        if( ( data.ChatID == null ||
            data.MatchID == null ||
            data.UserID == null ||
            data.Message == null 
           
            ) || 
            ( data.ChatID == undefined ||
                data.MatchID == undefined ||
                data.UserID == undefined ||
                data.Message == undefined 
             )  )
        {
            return callBack({Message:"Undefined or null parameter error.",Status:201})
        }
        try {
            var s;
            pool.query(
                'CALL save_MatchChat(?, ?, ?, ?)',
                [
                    data.ChatID ,
                    data.MatchID ,
                    data.UserID ,
                    data.Message            
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
    get:(UserID,ID,callBack) =>{
       
        pool.query(`call getBy_ChatID(?,?)`,
        [UserID,ID],
        (error,results,fields)=>{
            try{

            
            if(error){
                return callBack(error);

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
        let id ="'"+ID+"'";
	try{

        pool.query(`call getByID_MatchChat(`+id+`)`,
        [],
        (error,results,fields)=>{
            
            
            if(error){
                return callBack(error);

            }
        
            return callBack(null,results)
        
        }

        );
	}
        catch(e){
            
            return null;
        }
    },
    deleteId:(ID,callBack) =>{
        let id ="'"+ID+"'";
	try{
        pool.query(`call Delete_Message(`+id+`)`,
        [],
        (error,results,fields)=>{
              
            if(error){
                return   callBack(error);

            }
        
            return callBack(null,results)
       
        }

        );
 	}
        catch(e){
            
            return  callBack(e);
        }
    }

   
};