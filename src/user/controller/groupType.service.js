const pool = require("../../../config/database")


module.exports = {

    getAll: (data, callBack) => {
        try {
            pool.query(`call getAll_GroupType()`,
                [],
                (error, results, fields) => {
                    if (error) {
                        return callBack(null, results)

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