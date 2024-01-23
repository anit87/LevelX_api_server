const {create,get,getByID,deleteTeamId} = require("../services/Team.service");
const fs = require('fs');
module.exports ={
createTeam:(req,res)=>{
    const body = req.body;
    if (( body.TeamID == null ||  body.TeamName == null ||  body.ShortName == null ||  body.CountryId == null ||  body.CreatedBy == null ||  body.UpdatedBy == null) ||
            ( body.TeamID == undefined ||  body.TeamName == undefined ||  body.ShortName == undefined ||  body.CountryId == undefined ||  body.CreatedBy == undefined ||  body.UpdatedBy == undefined)
            || ( body.TeamName.trim() == '' ||  body.ShortName.trim() == '')) {
                return res.status(500).json ({
                    success :0,
                    error:{ Message: "Undefined or null parameter error", Status: 500 }
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
        if(results[0][0].TeamGuid!=null && req.files!=undefined && req.files ){
            let file = req.files.files;
             let filename = file.name;
            
            file.mv('./resources/Team_Logos/'+filename,(err)=>{
                if(err)throw err;
                else{
                    fs.rename('./resources/Team_Logos/'+filename, './resources/Team_Logos/'+results[0][0].TeamGuid+'.'+filename.split('.')[1], () => { 
                               
                    }); 
                    console.log("FIle Uploaded sucessfully",filename)
                }
            })
        }
        if(results[0][0].TeamGuid!=null && results[0][0].Status!=null){
        return res.status(200).json({
            success :200,
            data : results[0][0]
        });
        }
        else{
            return res.status(500).json({
                Status :201,
                data : results[0][0].Message==null?'Parameter error.':results[0][0]
            });

        }
    });

},
getTeam:(req,res)=>{
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
        if(results[0] != [] && results[0] != undefined &&  results[0].length!=0){
            fs.readdir('./resources/Team_Logos', (err, files) => { 
                if (err) 
                  console.log(err); 
                  else { 
                    console.log("\nCurrent directory filenames:"); 
                    results[0].forEach((item,i) => { 
                     const idx=files.findIndex(x=>x.split('.')[0]==item.TeamGuid)
                    if( idx!=-1){
                       item.TeamLogo = '/Team_Logos/'+files[idx];
                    }
                    else{
                  item.TeamLogo ='No Image.'
                    }
  
                    if(i==results[0].length-1){
                         return res.json({
                          success :200,
                          TeamList : results[0]
                      });
                  }
                  })
  
                 }
            });
        }
        else{
        return res.json({
            success :200,
            TeamList : results[0]
        });
    }
    });

},
getByID:(req,res)=>{
    const ID = req.params.ID;
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
        return res.status(500).json ({
            success :0,
            error:{ Message: "Undefined or null parameter error", Status: 500 }
        });
       
    }
    getByID(ID,(err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json ({
                success :0,
                message:err
            });
        }; 
        if(results[0][0]==undefined || results[0][0].length==0)
        {
            return res.json({
                success :200,
                Team : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0]
            });
        }
        if(results[0][0]!=undefined || results[0][0].TeamGuid!=undefined || results[0][0].TeamGuid!=null){
            
            try{
            fs.readdir('./resources/Team_Logos', (err, files) => { 
                if (err) 
                  console.log(err); 
                else { 
               const idx=files.findIndex(x=>x.split('.')[0]==results[0][0].TeamGuid)
                if( idx!=-1){
                    results[0][0].TeamLogo = '/Team_Logos/'+files[idx];
                }
                else{
                    results[0][0].TeamLogo ='No Image.'
                }
                return res.json({
                    success :200,
                    Team: results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0],
                });
                } 
              }) 
            }
            catch(e)
            {
                return res.json({
                    success :0,
                    ErrorMessage: e
                }); 
            }
        }
        else{
        return res.json({
            success :200,
            Team : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0]
        });
       }
    });

},
deleteTeam:(req,res)=>{
    const ID = req.params.ID;
	console.log('Team ----------------------', ID)
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
        return res.status(500).json ({
            success :0,
            error:{ Message: "Undefined or null parameter error", Status: 500 }
        });
       
    }
    deleteTeamId(ID,(err,results) => {
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

