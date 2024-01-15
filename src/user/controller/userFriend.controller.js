const {create} = require("../services/userFriend.service");
const fs = require('fs');
module.exports ={
addFriend:(req,res)=>{
    const body = req.body;
    if (( body.UserFriendId == null ||
        body.FromUserId == null ||
        body.ToUserId == null ||
        body.FriendStatusType == null ||
        body.CreatedBy == null ||
        body.UpdatedBy == null
   ) || ( body.UserFriendId == undefined ||
        body.FromUserId == undefined ||
        body.ToUserId == undefined ||
        body.FriendStatusType == undefined ||
        body.CreatedBy == undefined ||
        body.UpdatedBy == undefined)) {
            return res.status(500).json ({
                success :0,
                error:{ Message: "Undefined or null or empty parameter error", Status: 500 }
            });
   }
    create(body,(err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json ({
                success :0,
                message:err
            });
        }
        return res.status(200).json({
            success :200,
            data : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0]
        });
    });

},

}

