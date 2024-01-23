const { SaveMatchResultService, UpdateMatchService, GetAllResultservice, GetSingleResultservice, DeleteMatchResultService } = require("../services/MatchResult.service");

module.exports = {
    saveMatchResultRouter: (req, res) => {
        const matchList = req.body;
	var i=0;
        for  (let x of matchList) {
        if (( x.ResultId == undefined||x.MatchId == undefined ||   x.PlayerID == undefined ||  x.TeamId == undefined ||  x.Killed == undefined ||  x.Death == undefined || x.Alive==undefined)
        || (x.ResultId ==  null||x.MatchId ==  null ||   x.PlayerID ==  null ||  x.TeamId ==  null ||  x.Killed ==  null ||  x.Death ==  null || x.Alive== null)) 
          { 
            return res.status(500).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error in list " + i,x,  Status: 500 }
            });
        }
            i =i+1;
        }
        SaveMatchResultService(matchList, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 500,
                    message: JSON.stringify(err)
                });
            }
            return res.status(200).json({
                success: 200,
                message: "data Save Successfully"
            });
        });


    },

    UpdateMatchResultRouter: (req, res) => {
        const UpdateMatchList = req.body;
        UpdateMatchService(UpdateMatchList, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 500,
                    message: err
                });
            }
            return res.status(200).json({
                sucess: 200,
                message: "Data Save Sucessfully"
            });


        });



    },
    GetMatchResultrouter: (req, res) => {
        debugger;
        const ID = req.Match;
        
        GetAllResultservice(ID, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 500,
                    message: err
                })
            }
            else {
                return res.json({
                    success: 200,
                    message: "match Record Found Succesfully",
                    TeamList: results[0]
                });
            }
        })
    },

    GetSingleMatchResultrouter: (req, res) => {
        debugger;
        const ID = req.params.ResultId;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
            return res.status(500).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 500 }
            });
           
        }
        GetSingleResultservice(ID, (err, results) => {
            if (res) {
                return res.json({
                    success: 200,

                    TeamList: results[0]
                });
            }
            else {
                console.log(err);
                return res.status(500).json({
                    success: 500,
                    message: err
                })
            }

        })
    },



    DeleteMatchResultRoute: (req, res) => {
        const ID = req.params.ResultId;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined){
            return res.status(500).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 500 }
            });
           
        }
        DeleteMatchResultService(ID, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.json({
                success: 200,
                message: "Match Result Record Delete Succesfully",

            });
        });

    }


}