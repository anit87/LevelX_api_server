const pool = require("../../../config/database")

module.exports ={

    getID:(ID,callBack) =>{
        try{
        pool.query(`call getBy_UserId('`+ID+`')`,
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
        
        return e;
    }
    },
    verifyOTP:(ID,OTP,callBack) =>{
        try{
        pool.query(`call verifyOTP(?,?)`,
        [ID,OTP],
        (error,results,fields)=>{

            if(error){
                return  callBack(error);

            }
        
            return callBack(null,results)
        }
        );
    }
    catch(e){
        
        return e;
    }
    },
    AfterOTP:(ID,OTP,callBack) =>{
        try{

        pool.query(`call resetOtp('${ID}',${OTP})`,
        [ID,OTP],
        (error,results,fields)=>{
            if(error){
                return callBack(error);

            }
            return callBack(null,results)
        }
        );
    }
    catch(e){
        
        return e;
    }
    },
}