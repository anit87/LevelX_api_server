const pool = require("../../../config/database")


module.exports={

    getAll:(data,callBack) =>{
        if(data.columnValue == null || data.columnValue == undefined ||data.userID == null || data.userID == undefined ){
            return callBack({error:"Perameter undefined error."});
        }
        try {
            
            const query = `CALL search_AccptedFriends('${data.columnValue}','${data.userID}')`;
        
            pool.query(query, (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
        
                return callBack(null, results);
            });
        } catch (e) {
            console.error("Error executing stored procedure:", e);
            return callBack(null,e);
        }
    }
   
};