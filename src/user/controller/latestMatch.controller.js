const {getAll} = require("../services/latestMatch.service");
const fs = require('fs');
module.exports ={

	
	getLatestMatch : (req, res) => { 

		const body = req.body;
		getAll(body,(err,results) => {
			if(err){
                console.log(err);
                return res.status(500).json ({
                    success :0,
                    message:err
                });
            }
            if(results[0]==[]||results[0]==undefined ||results[0]==null ||results[0].length==0 )
            {
              return res.json({
                success :200,
                TeamList : null,
                message:"No Match found."
            });
            }
            if(results[0]!=[]||results[0]!=undefined){
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
                            
                            fs.readdir('./resources/Team_Logos', (err, files) => { 
                                if (err) 
                                  console.log(err); 
                                  else { 
                                    console.log("\nCurrent directory filenames:"); 
                                    results[0].forEach((item,i) => { 
                                     const idx1=files.findIndex(x=>x.split('.')[0]==item.Team1Guid);
                                     const idx2=files.findIndex(x=>x.split('.')[0]==item.Team2Guid)
                                    if( idx1!=-1){
                                       item.Team1Logo = '/Team_Logos/'+files[idx1];
                                    }
                                    else{
                                  item.Team1Logo ='No Image.'
                                    }
                                    if( idx2!=-1){
                                        item.Team2Logo = '/Team_Logos/'+files[idx2];
                                     }
                                     else{
                                   item.Team2Logo ='No Image.'
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
	
}