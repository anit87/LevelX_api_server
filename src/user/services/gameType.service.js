const pool = require("../../../config/database")


module.exports = {

    getAll: (data, callBack) => {
        try {
            pool.query(`call getAll_GameType()`,
                [],
                (error, results, fields) => {

                    if (error) {
                        return callBack(null,error);
                    }
                   return callBack(null, results)
                }

            );
        }
        catch (e) {

            return callBack(null,e);
        }
    },


};