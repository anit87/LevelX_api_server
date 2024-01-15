const pool = require("../../../config/database")


module.exports = {
    create: (data, callBack) => {
        if ((data.TeamID == null || data.TeamName == null || data.ShortName == null || data.CountryId == null || data.CreatedBy == null || data.UpdatedBy == null) ||
            (data.TeamID == undefined || data.TeamName == undefined || data.ShortName == undefined || data.CountryId == undefined || data.CreatedBy == undefined || data.UpdatedBy == undefined)) {
            return callBack({ Message: "Undefined or null parameter error Team.", Status: 201 })
        }
        try {
            var s, m;
            pool.query(`call SaveUpdate_Team(?,?,?,?,?,?,@?,@?)`,
                [data.TeamID, data.TeamName, data.ShortName, data.CountryId, data.CreatedBy, data.UpdatedBy, s, m],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);

                    }
                    return callBack(null, results)
                }

            );
        }
        catch (err) {
            return callBack(err);
        }

    },
    get: (data, callBack) => {
        try {
            pool.query(`call getAll_Team()`,
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

            return callBack(null,e);
        }
    },
    getByID: (ID, callBack) => {
        try {
            pool.query(`call getBy_TeamID(` + ID + `)`,
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

            return callBack(null,e);
        }
    },
    deleteTeamId: (ID, callBack) => {
        try {

            pool.query(`call Delete_Team(` + ID + `)`,
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

            return callBack(null,e);
        }
    }


};

