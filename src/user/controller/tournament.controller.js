const {create,get,getByID,deleteTourId} = require("../services/tournament.service");
const fs = require('fs');
module.exports ={
createTour:(req,res)=>{
    const body = req.body;
    if (body == null || body == undefined || ( body.TournamentID == null ||
        body.TournamentName == null ||
        body.Game == null ||
        body.TournamentDescription == null ||
        body.PlayoffType == null ||
        body.AmountofTeams == null ||
        body.GroupType == null ||
        body.AmountOfRounds == null ||
        body.Participants == null ||
        body.CreatedBy == null ||
        body.UpdatedBy == null
   ) ||
       ( body.TournamentID == undefined ||
            body.TournamentName == undefined ||
            body.Game == undefined ||
            body.TournamentDescription == undefined ||
            body.PlayoffType == undefined ||
            body.AmountofTeams == undefined ||
            body.GroupType == undefined ||
            body.AmountOfRounds == undefined ||
            body.Participants == undefined ||
            body.CreatedBy == undefined ||
            body.UpdatedBy == undefined)
           ||( body.TournamentName.trim() == '') ){
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
        if(results[0][0].TournamentGuid!=null && results[0][0].Status!=null && req.files){
            let file = req.files.files;
             let filename = file.name;
             console.log("FIle Upload",filename)
            file.mv('./resources/Tournament_Logo/'+filename,(err)=>{
                if(err)throw err;
                else{
                    fs.rename('./resources/Tournament_Logo/'+filename, './resources/Tournament_Logo/'+results[0][0].TournamentGuid+'.'+filename.split('.')[1], () => { 
                               
                    }); 
                    console.log("FIle Uploaded sucessfully",filename)
                }
            })
        }
        if(results[0][0].TournamentGuid!=null && results[0][0].Status!=null){
            return res.status(200).json({
                success :200,
                data : results[0][0]
            });
            }
            else{
                return res.status(500).json({
                    Status :500,
                    data : results[0][0].Message==null?'Empty Parameter error.':results[0][0].Message
                });
    
            }
    });

},
getTour:(req,res)=>{
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
            fs.readdir('./resources/Tournament_Logo', (err, files) => { 
                if (err) 
                  console.log(err); 
                  else { 
                    console.log("\nCurrent directory filenames:"); 
                    results[0].forEach((item,i) => { 
                     const idx=files.findIndex(x=>x.split('.')[0]==item.TournamentGuid)
                    if( idx!=-1){
                       item.TournamentLogo = '/Tournament_Logo/'+files[idx];
                    }
                    else{
                  item.TournamentLogo ='No Image.'
                    }
  
                    if(i==results[0].length-1){
                         return res.json({
                          success :200,
                          TournamentList : results[0]
                      });
                  }
                  })
  
                 }
            });
        }
        else{
        return res.json({
            success :200,
            TournamentList : results[0]
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
        }
        
        if(results[0][0]==undefined || results[0][0]=={} ||results[0][0].length==0){
        return res.json({
            success :200,
            Tournament : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0],
            TournamentTeamsList : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[1],
	        TournamentMatchList : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[2]
        });
        }
        else{
            
                fs.readdir('./resources/Tournament_Logo', (err, files) => { 
                    if (err) 
                      console.log(err); 
                    else { 
                   const idx=files.findIndex(x=>x.split('.')[0]==results[0][0].TournamentGuid)
                    if( idx!=-1){
                        results[0][0].TournamentLogo = '/Tournament_Logos/'+files[idx];
                    }
                    else{
                        results[0][0].TournamentLogo ='No Image.'
                    }
                    return res.json({
                        success :200,
                        Tournament : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0],
                        TournamentTeamsList : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[1],
	                    TournamentMatchList : results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[2]
                    });
                    } 
                  }) 
                }
                
            
        
    });

},
deleteTour:(req,res)=>{
    const ID = req.params.ID;
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
            return res.status(500).json ({
            success :0,
            error:{ Message: "Undefined or null parameter error", Status: 500 }
        });
    }
    deleteTourId(ID,(err,results) => {
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

