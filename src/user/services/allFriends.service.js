const pool = require("../../../config/database")


module.exports = {

    getAll: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
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

        catch (err) {
            return callBack(err)
        }
    },


};