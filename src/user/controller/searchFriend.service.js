const pool = require("../../../config/database")


module.exports={

    getAll:(data,callBack) =>{
        try {
            const query = `CALL search_Friends('${data.columnValue}','${data.userID}')`;
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