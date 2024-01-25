//import util from 'util';
const util=require("util");
const pool = require("../../../config/database");
const { resolve } = require("path");

async function RunSql( query)
{
    return new Promise((resolve, reject) => {
        pool.query(query,null,function (err, result){
            if (err){
                console.log("Garden Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    });
}
module.exports={


    UpdateMatchService:(data,callBack) =>{
             var s,m;
         
             console.log(data,"ServiceData");
          
             pool.query(`call SaveUpdateMatchesResult(`+  data.ResultId+`, `+ data.MatchId+`,`+ data.PlayerID+`,`+ data.TeamId+`,'`+data.Killed+`','`+data.Death+`','`+data.Alive+`',@`+s+`,@`+ m+`)`,
             [],
             (error,results,fields)=>{
                 if(error){
                    return callBack(error);
    
                 }
                
                 return callBack(null,results)
             }
    
             );
         },

    SaveMatchResultService:async (data,callBack) =>{
        try{
        const data2=JSON.stringify(data);
        var data1='';
        var i = 0;
        //for await   (i=0;i<data.length;i++)
        for await   (let x of data)
        {
         console.log(util.format("CALL SaveUpdateMatchesResult(%d,%d,%d,%d,%d,%d,%d)", x.ResultId, x.MatchId, x.PlayerID, x.TeamId, x.Killed, x.Death, x.Alive)+"=>ServiceData2");
        await RunSql(util.format("CALL SaveUpdateMatchesResult(%d,%d,%d,%d,%d,%d,%d)", x.ResultId, x.MatchId, x.PlayerID, x.TeamId, x.Killed, x.Death, x.Alive));
   
        }

       return callBack(null,{msg:"Successfully updated",status:200});
    }
    catch(e){
        return e;
    }
    
    },

    GetAllResultservice:(data,callBack) =>{
        var s,m;
            try{

        pool.query(`call GetAllMatchResult(@?,@?)`,
        [s,m],
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
        //console.log("list",results[0])
            return callBack(null,results)
        }

        );
 	}
        catch(e){  
            return e;
        }
    },

    GetSingleResultservice:(ResultId,callBack) =>{
       let id ="'"+ResultId+"'";
  	try{

        pool.query(`call GetSingleMatchesResult(`+id+`)`,
        [],
        (error,results,fields)=>{
          
            
            if(error){
                return callBack(error.message);
            }
        //console.log("SingleMatchResultlist",results[0])
       
            return callBack(null,results)
        
        }

        );
	}
        catch(e){
            
            return e.message;
        }
    },
    DeleteMatchResultService:(ResultId,callBack) =>{
        var s,m;
	let id ="'"+ResultId+"'";
 	try{
        pool.query(`call DeleteMatchResult(`+id+`)`,
        [],
        (error,results,fields)=>{ 
            if(error){
                return  callBack(error);
            }
            return callBack(null,results)
        }

        );
	}
        catch(e){
            
            return e;
        }
    }

};