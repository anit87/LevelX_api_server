const pool = require("../../../config/database")


module.exports = {

    getAll: (playerID_1,playerID_2, callBack) => {
        try {
            pool.query(`call getTwo_PlayersDetail(?,?)`,
                [playerID_1,playerID_2],
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