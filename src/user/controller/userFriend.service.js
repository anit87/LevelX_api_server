const pool = require("../../../config/database")


module.exports = {
    create: (data, callBack) => {


        try {
            var s, m;
            if ((data.UserFriendId == null ||
                data.FromUserId == null ||
                data.ToUserId == null ||
                data.FriendStatusType == null ||
                data.CreatedBy == null ||
                data.UpdatedBy == null
            ) || (data.UserFriendId == undefined ||
                data.FromUserId == undefined ||
                data.ToUserId == undefined ||
                data.FriendStatusType == undefined ||
                data.CreatedBy == undefined ||
                data.UpdatedBy == undefined)) {
                return callBack({ Message: "Undefined or null parameter error", Status: 201 })
            }
            pool.query(
                `CALL saveUpdate_FriendRequest(?, ?, ?, ?, ?, ?, @${s}, @${m})`,
                [data.UserFriendId, data.FromUserId, data.ToUserId, data.FriendStatusType, data.CreatedBy, data.UpdatedBy],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } catch (err) {
            
            console.error('Caught synchronous error:', err);
            return callBack(null, err);
        }
    }
    

};

