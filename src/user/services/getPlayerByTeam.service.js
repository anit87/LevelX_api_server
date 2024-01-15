const pool = require("../../../config/database")


module.exports = {

    getAll: (data, callBack) => {
        if (data.id == undefined || data.id == null) {
            return callBack({ Message: 'Undefined or null ID.' })
        }
        try {
            pool.query(`call getPlayer_ByTeam(?)`,
                [data.id],
                (error, results, fields) => {

                    if (error) {
                        return callBack(null, error);

                    }

                    return callBack(null, results);

                }

            );
        }
        catch (e) {

            return callBack(null, e);
        }
    },


};