const pool = require("../../../config/database")
module.exports = {
    create: (data, callBack) => {
        //console.log("list data",data)
        if ((data.ChatID == null ||
            data.Sender == null ||
            data.Receiver == null ||
            data.Message == null
        ) ||
            (data.ChatID == undefined ||
                data.Sender == undefined ||
                data.Receiver == undefined ||
                data.Message == undefined
            )) {
            return callBack({ Message: "Undefined or null parameter error", Status: 201 })
        }
        try {
            var s;
            pool.query(
                'CALL save_PrivateChat(?, ?, ?, ?)',
                [
                    data.ChatID,
                    data.Sender,
                    data.Receiver,
                    data.Message
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
    get: (UserID, ID, callBack) => {
        if (UserID == null || UserID == undefined || ID == null || ID == undefined ) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {
            pool.query(`call getBy_ChatID(?,?)`,
                [UserID, ID],
                (error, results, fields) => {
                    if (error) {
                        return callBack(null, error);
                    }

                    return callBack(null, results)
                }

            );
        }
        catch (e) {

            return null;
        }
    },
    getByID: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {
		 let id ="'"+ID+"'";
            pool.query(`call getBy_ChatID(?)`,
                [id],
                (error, results, fields) => {

                    if (error) {
                        return callBack(null, error);
                    }
                    return callBack(null, results)
                }
            );
        }
        catch (e) {

            return callBack(null, e);
        }
    },
    deleteTeamId: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {
		 let id ="'"+ID+"'";
            pool.query(`call Delete_Message(` + id + `)`,
                [],
                (error, results, fields) => {

                    if (error) {
                        return callBack(null, error);
                    }

                    return callBack(null, results)
                }
            );
        }
        catch (e) {

            return callBack(null, e);
        }
    }

};