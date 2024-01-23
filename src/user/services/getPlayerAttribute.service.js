const pool = require("../../../config/database")


module.exports = {

    getAll: (playerID_1,playerID_2, callBack) => {
        if (playerID_1 == null || playerID_1 == undefined || playerID_2 == null || playerID_2 == undefined ) {
            return callBack({ error: "Perameter null or undefined error." });
        }
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