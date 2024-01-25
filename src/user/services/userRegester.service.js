const pool = require("../../../config/database")


module.exports = {
    create: (data, callBack) => {

        var s, m;
        if ((data.UserID == null ||
            data.FullName == null ||
            data.Email == null ||
            data.GamerName == null ||
            data.Country == null ||
            data.CountryCode == null ||
            data.PhoneNumber == null ||
            data.Birth == null ||
            data.IsActive == null) || (data.UserID == undefined ||
                data.FullName == undefined ||
                data.Email == undefined ||
                data.GamerName == undefined ||
                data.Country == undefined ||
                data.CountryCode == undefined ||
                data.PhoneNumber == undefined ||
                data.Birth == undefined ||
                data.IsActive == undefined)) {
            return callBack({ Message: "Undefined or null parameter error", Status: 201 })
        }

        try {
            pool.query(
                'CALL SaveUpdate_User(?, ?, ?, ?, ?, ?, ?, ?, ?, @s, @m)',
                [
                    data.UserID,
                    data.FullName,
                    data.Email,
                    data.GamerName,
                    data.Country,
                    data.CountryCode,
                    data.PhoneNumber,
                    data.Birth,
                    data.IsActive
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);

                    }

                    return callBack(null, results)
                }

            );
        }
        catch (err) {
            console.error("Error executing stored procedure:", err);
            return callBack(null,err);
        }
    },
    get: (data, callBack) => {
        try {

            pool.query(`call getAll_User()`,
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

            return callBack(e);
        }
    },
    getByID: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {

            pool.query(`call getBy_UserID(?)`,
                [ID],
                (error, results, fields) => {


                    if (error) {
                        return callBack(error);

                    }

                    return callBack(null, results)
                }

            );
        }
        catch (e) {
            return callBack(e);
        }
    },
    getUpdateID: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {

            pool.query(`call getUpdate_UserID(?)`,
                [ID],
                (error, results, fields) => {


                    if (error) {
                        return callBack(error);

                    }

                    return callBack(null, results)
                }

            );
        }
        catch (e) {
            return callBack(e);
        }
    },
    deleteUserId: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {

            pool.query(`call Delete_User(` + ID + `)`,
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

            return callBack(e);
        }
    }


};

