const {create,get,getByID,deleteUserId} = require("../services/userRegester.service");

module.exports ={
createUser:(req,res)=>{
    const body = req.body;
    if (( body.UserID == null ||
        body.FullName == null ||
        body.Email == null ||
        body.GamerName == null ||
        body.Country == null ||
        body.CountryCode == null ||
        body.PhoneNumber == null ||
        body.Birth == null ||
        body.IsActive == null) || ( body.UserID == undefined ||
            body.FullName == undefined ||
            body.Email == undefined ||
            body.GamerName == undefined ||
            body.Country == undefined ||
            body.CountryCode == undefined ||
            body.PhoneNumber == undefined ||
            body.Birth == undefined ||
            body.IsActive == undefined) || (     body.FullName.trim() == '' ||
                body.Email.trim() == '' ||
                body.GamerName.trim() == '' ||
                body.Country == 0 ||
                body.CountryCode == 0 ||
                body.Birth.trim() == '' )) {
                return res.status(400).json ({
                    success :0,
                    error:{ Message: "Undefined or null or empty parameter error", Status: 400 }
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
            data : results[0][0]
        });
    });

},
getUser:(req,res)=>{
    debugger
    const body = req.body ;
    get(body,(err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json ({
                success :0,
                message:err
            });
        }
        return res.json({
            success :200,
            userList : results[0]
        });
    });

},
getByID:(req,res)=>{
    const ID = req.params.ID;
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined || !isNaN(ID)){
            return res.status(400).json ({
            success :0,
            error:{ Message: "Undefined or null parameter error", Status: 400 }
        });
       
    }
    getByID(ID,(err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json ({
                success :0,
                message:err
            });
        }
        return res.json({
            success :200,
            user : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0]
        });
    });

},
deleteUser:(req,res)=>{
    const ID = req.params.ID;
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
      
        return res.status(400).json ({
            success :0,
            error:{ Message: "Undefined or null parameter error", Status: 400 }
        });
       
    }
    deleteUserId(ID,(err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json ({
                success :0,
                message:err
            });
        }
        return res.json({
            success :200,
            data : results[0][0]
        });
    });

}
}

