const pool = require("../../../config/database")

module.exports ={

    getID:(ID,callBack) =>{
        pool.query(`call getBy_UserId('`+ID+`')`,
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
    verifyOTP:(ID,OTP,callBack) =>{
        pool.query(`call verifyOTP(?,?)`,
        [ID,OTP],
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
    AfterOTP:(ID,OTP,callBack) =>{
        pool.query(`update UserBasic set OTP = 0 where EmailName='${ID}' and OTP = ${OTP}`,
        [ID,OTP],
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
}