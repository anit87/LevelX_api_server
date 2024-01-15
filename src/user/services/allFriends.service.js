const pool = require("../../../config/database")


module.exports = {

    getAll: (ID, callBack) => {
        try {
            pool.query(`call getAll_Friends(?)`,
                [ID],
                (error, results, fields) => {

                    if (error) {
                        return callBack(null, error)
                    }
                    

                    return callBack(null, results)
                }

            );
        }

        catch (e) {
            return callBack(null, e)
        }
    },


};