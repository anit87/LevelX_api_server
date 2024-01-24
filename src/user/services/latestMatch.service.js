const pool = require("../../../config/database")


module.exports = {

    getAll: (data, callBack) => {
        try {
            pool.query(`call getAll_LatestMatches()`,
                [],
                (error, results, fields) => {

                    if (error) {
                        return callBack(error);

                    }
                    console.log("dfdgdfgdf",results[0].length)
                    return callBack(null, results[0]==[]?[]:results)

                }

            );
        }
        catch (e) {

            return callBack(null, e);
        }
    },


};