const pool = require("../../../config/database")
module.exports={
    create:(data,callBack) =>{
        //console.log("list data",data)
        if( ( data.ChatID == null ||
            data.Sender == null ||
            data.Receiver == null ||
            data.Message == null 
            
           
            ) || 
            ( data.ChatID == undefined ||
                data.Sender == undefined ||
                data.Receiver == undefined ||
                data.Message == undefined 
                 )  )
        {
            return callBack({Message:"Undefined or null parameter error",Status:201})
        }
        try {
            var s;
            pool.query(
                'CALL save_PrivateChat(?, ?, ?, ?)',
                [
                    data.ChatID ,
                    data.Sender ,
                    data.Receiver ,
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
        
        pool.query(`call getBy_ChatID(?)`,
        [ID],
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
        
        pool.query(`call Delete_Message(`+ID+`)`,
        [],
        (error,results,fields)=>{
            try{

            
            if(error){
                return   callBack(error);

            }
        
            return callBack(null,results)
        }
        catch(e){
            
            return  callBack(e);
        }
        }

        );
    }

   
};