const pool = require("../../../config/database")


module.exports = {
    create: (data, callBack) => {
        if ((data.TournamentID == null ||
            data.TournamentName == null ||
            data.Game == null ||
            data.TournamentDescription == null ||
            data.PlayoffType == null ||
            data.AmountofTeams == null ||
            data.GroupType == null ||
            data.AmountOfRounds == null ||
            data.Participants == null ||
            data.CreatedBy == null ||
            data.UpdatedBy == null
        ) ||
            (data.TournamentID == undefined ||
                data.TournamentName == undefined ||
                data.Game == undefined ||
                data.TournamentDescription == undefined ||
                data.PlayoffType == undefined ||
                data.AmountofTeams == undefined ||
                data.GroupType == undefined ||
                data.AmountOfRounds == undefined ||
                data.Participants == undefined ||
                data.CreatedBy == undefined ||
                data.UpdatedBy == undefined)) {
            return callBack({ Message: "Undefined or null parameter error", Status: 201 })
        }
        try {
            var s, m;
            pool.query(
                'CALL SaveUpdate_Tournament(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @?, @?)',
                [
                    data.TournamentID,
                    data.TournamentName,
                    data.Game,
                    data.TournamentDescription,
                    data.PlayoffType,
                    data.AmountofTeams,
                    data.GroupType,
                    data.AmountOfRounds,
                    data.Participants,
                    data.CreatedBy,
                    data.UpdatedBy,
                    s,
                    m
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } catch (err) {
            // This block will not capture asynchronous errors from pool.query
            console.error('Caught synchronous error:', err);
            return callBack(err);
        }
    },
    get: (data, callBack) => {
        try {

            pool.query(`call getAll_Tournament()`,
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

            return callBack(e);
        }
    },
    getByID: (ID, callBack) => {
if (ID == null||ID == undefined){
return callBack({ Message: "Undefined or null parameter error", Status: 201 })
		}

        try {
            pool.query(`call getBy_TournamentID(` + ID + `)`,
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

            return callBack(e);
        }
    },
    deleteTourId: (ID, callBack) => {
if (ID == null||ID == undefined){
return callBack({ Message: "Undefined or null parameter error", Status: 201 })
		}
        try {
            pool.query(`call Delete_Tournament(` + ID + `)`,
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

            return callBack(e);
        }
    }


};

