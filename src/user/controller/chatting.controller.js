const {create,get,getByID,deleteTeamId} = require("../services/chatting.service");
const fs = require('fs');
module.exports ={
createMessage:(req,res)=>{
    const body = req.body;
    var validateitem =['ChatID','Sender','Receiver','Message'];
    var check = validateitem.filter(x=>[null,undefined].includes(body[x] ))
    if(check.length>0){
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
        /*if(results[0][0].PlayerGuid!=null && req.files){
            let file = req.files.files;
             let filename = file.name;
            
            file.mv('./resources/Player_images/'+filename,(err)=>{
                if(err)throw err;
                else{
                    fs.rename('./resources/Player_images/'+filename, './resources/Player_images/'+results[0][0].PlayerGuid+'.'+filename.split('.')[1], () => { 
                               
                    }); 
                    console.log("FIle Uploaded sucessfully",filename)
                }
            })
        }*/
           if(results[0][0]){
            return res.status(200).json({
                success :200,
                data : results[0][0]
            });
            }
            else{
                return res.status(500).json({
                    Status :500,
                    data : results[0][0].Message==null?'Parameter error.':''
                });
    
            }
    });

},
getAll:(req,res)=>{
    debugger
    const UserID = req.params.UserID;
    const ID = req.params.ID;
    get(UserID,ID,(err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json ({
                success :0,
                message:err
            });
        }
        /*if(results[0]!=[]||results[0]!=undefined ){
            
            fs.readdir('./resources/Player_images', (err, files) => { 
                if (err) 
                  console.log(err); 
                else { 
                  console.log("\nCurrent directory filenames:"); 
                  

                  results[0].forEach((item,i) => { 

                 const idx=files.findIndex(x=>x.split('.')[0]==item.PlayerGuid)
                    if( idx!=-1){
                     item.PlayerImage = '/Player_images/'+files[idx];
               }
               else{
                item.PlayerImage ='No Image.'
               }

                  if(i==results[0].length-1){
                    return res.json({
                        success :200,
                        PlayerList : results[0]
                    });
                }
                })

                } 
              }) 
        }*/
        
       
            return res.json({
                success :200,
                Messages : results[0]
            });
      
        


    });

},
getByID:(req,res)=>{
    const ID = req.params.ID;
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){

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
        /*let playerImage="" ;
        if(results[0][0]!={}||results[0][0]!=undefined ){
            
            fs.readdir('./resources/Player_images', (err, files) => { 
                if (err) 
                  console.log(err); 
                else { 
                  //console.log("\nCurrent directory filenames:"); 

                const idx=files.findIndex(x=>x.split('.')[0]==results[0][0].PlayerGuid)
                if( idx!=-1){
                    results[0][0].PlayerImage = '/Player_images/'+files[idx];
                }
                else{
                    results[0][0].PlayerImage ='No Image.'
                }
                return res.json({
                    success :200,
                    Player: results[0][0]=={}||results[0][0]==undefined || results[0][0]==null?null:results[0][0],
                });
                } 
              }) 
        }*/
       
       
        return res.json({
            success :200,
            Messages: results[0]
        });
      
    });

},
deletePlayer:(req,res)=>{
    const ID = req.params.ID;
    if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
        console.log(ID,'in')
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

