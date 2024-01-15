const pool = require("../../../config/database")


module.exports = {

    getAll: (data, callBack) => {
        try {
            pool.query(`call getAll_LatestMatches()`,
                [],
                (error, results, fields) => {

                    if (error) {
                        callBack(error);

                    }
                    return callBack(null, results)

                }

            );
        }
        catch (e) {

            return callBack(null, e);
        }
    },


};