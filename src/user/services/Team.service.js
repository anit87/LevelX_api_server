const pool = require("../../../config/database")


module.exports = {
    create: (data, callBack) => {
        if ((data.TeamID == null || data.TeamName == null || data.ShortName == null || data.CountryId == null || data.CreatedBy == null || data.UpdatedBy == null) ||
            (data.TeamID == undefined || data.TeamName == undefined || data.ShortName == undefined || data.CountryId == undefined || data.CreatedBy == undefined || data.UpdatedBy == undefined)
            || (data.TeamName.trim() == '' || data.ShortName.trim() == '')) {
            return callBack({ Message: "Undefined or null or blank parameter error Team.", Status: 201 })
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
                        return  callBack(error);
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
        if (ID == null || ID == undefined){
            return callBack({ Message: "Undefined or null parameter error", Status: 201 })
                    }
        try {
		let id ="'"+ID+"'";
            pool.query(`call getBy_TeamID(` + id + `)`,
                [],
                (error, results, fields) => {

                    if (error) {
                        return  callBack(error);

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
        if (ID == null || ID == undefined){
            return callBack({ Message: "Undefined or null parameter error", Status: 201 })
                    }
        try {
		let id ="'"+ID+"'";
            pool.query(`call Delete_Team(` + id + `)`,
                [],
                (error, results, fields) => {

                    if (error) {
                        return callBack(error);

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

