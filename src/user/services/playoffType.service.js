const pool = require("../../../config/database")


module.exports = {

    getAll: (data, callBack) => {

        pool.query(`call getAll_PlayoffType()`,
            [],
            (error, results, fields) => {
                try {
                    if (error) {
                        return  callBack(error);

                    }
                  
                    return callBack(null, results)
                }
                catch (e) {

                    return callBack(null, e);
                }
            }

        );
    },


};