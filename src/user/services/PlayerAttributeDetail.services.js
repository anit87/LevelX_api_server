const pool = require("../../../config/database");
const util = require("util");
async function RunSql(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, null, function (err, result) {
            if (err) {
                console.log("Garden Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    });
};
module.exports = {
    SaveUpdatePlayerAttributeDetailService: (data, callBack) => {
        if ((data.PlayerID == undefined ||  data.AttributeID == undefined || data.AttributeValue == undefined || data.CreatedBy == undefined || data.UpdatedBy == undefined)
           || data.PlayerID == undefined || data.AttributeID == null || data.AttributeValue == null || data.CreatedBy == null || data.UpdatedBy == null) 
        {return callBack({error:"Perameter null or undefined error."}); }
        var s, m;
        pool.query(`call saveUpdate_PlayerAttribute(?,?,?,?,?,?,@?,@?)`,
            [
                data.PlayerDetailId, data.PlayerID, data.AttributeID, data.AttributeValue, data.CreatedBy, data.UpdatedBy, s, m
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);

                }
                return callBack(null, results)
            }
        );


    },
    SavePlayerAttributeDetail: async (data, callBack) => {

        try {
            for await (let x of data) {
                console.log(util.format("call saveUpdate_PlayerAttributeDetail(%d,%d,%d,%d,%d,%d)", x.PlayerDetailId, x.PlayerID, x.AttributeId, x.AttributeValue, x.CreatedBy, x.UpdatedBy) + "=>ServiceData2");

                await RunSql(util.format("call saveUpdate_PlayerAttributeDetail(%d,%d,%d,%d,%d,%d)", x.PlayerDetailId, x.PlayerID, x.AttributeId, x.AttributeValue, x.CreatedBy, x.UpdatedBy));
            }

            return callBack(null, { msg: "Successfully saved", status: 200 });
        } catch (e) {
            return callBack(e);
        }
    },

    GetAllPlayerAttributeDetailservice: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {
	let id ="'"+ID+"'";
            pool.query(`call get_forUpdatePlayerDetail(` + id + `)`,
                [],
                (error, results, fields) => {

                    if (error) {
                        return callBack(error);

                    }
                    // console.log("list",results[0])

                    return callBack(null, results)

                }

            );
        }
        catch (e) {

            return callBack(e);
        }
    },
    GetSingleservice: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {
	let id ="'"+ID+"'";
            pool.query(`call getBy_PlayerDetailID(` + id + `)`,
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


    DeletePlayerAttributeDetailService: (ID, callBack) => {
        if (ID == null || ID == undefined) {
            return callBack({ error: "Perameter null or undefined error." });
        }
        try {
	let id ="'"+ID+"'";
            pool.query(`call Delete_PlayerAttributeDetail(` + id + `)`,
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