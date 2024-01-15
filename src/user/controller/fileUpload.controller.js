//const {getAll} = require("../services/country.service");

module.exports ={

	
	fileUpload : (req, res) => { 
        //console.log("file",req.files)
        if(req.files)
        {
            let file = req.files.file;
            let filename = file.name;
            file.rename(results[0][0].PlayerGuid, filename, function (err) {
                if (err) throw err;
                
              });
            filename = file.name;
            file.mv('./src/resources/Player_images/'+filename,(err)=>{
                if(err)throw err;
                else{
                    res.send("FIle Uploaded sucessfully")
                }
            })
        }
	  
	},
	
}