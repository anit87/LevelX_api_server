const { SaveUpdateMatchService, GetAllservice, GetSingleservice, DeleteMatchService, GetSingleFormservice } = require("../services/match.service");
const fs = require('fs');
module.exports = {
    saveUpdateMatchRouter: (req, res) => {
        const matchList = req.body;
        var validateitem =['MatchId','TournamentId' ,'TeamId1' ,'TeamId2','MatchDate' ,'MatchTime' ,'Team1Score' ,'Team2Score',
        'BestOf' ,'CreatedBy' ,'UpdatedBy' ,'YoutubeURL' ,'Camera_1URL' ,'Camera_2URL' ,'Camera_3URL',
        'Camera_4URL'];
        var check = validateitem.filter(x=>[null,undefined,'','null','undefined'].includes(matchList[x] ))
        if(check.length>0){
         return res.status(400).json ({
             success :0,
             error:{ Message: "Undefined or null parameter error", Status: 400 }
         }); 
        }

        {
            SaveUpdateMatchService(matchList, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 500,
                        message: err
                    });
                }
                return res.status(results[0][0].status).json({
                    success: results[0][0].status,
                    message: results[0][0].messsage
                });
            });
        }

    },

    GetMatchrouter: (req, res) => {
        debugger;
        const Match = req.Match;
        GetAllservice(Match, (err, results) => {
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
    GetSingleFormMatchrouter: (req, res) => {
        debugger;
        const MatchId = req.params.MatchId;
        if (MatchId === 'null' || MatchId === 'undefined' || MatchId == null || MatchId == undefined ){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
        GetSingleFormservice(MatchId, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({

                    ErrorMessage: err
                })
            }
            else {
                return res.json({
                    success: 200,
                    Match: results[0]
                });
            }
        })
    },
    GetSingleMatchrouter: (req, res) => {
        debugger;
        const ID = req.params.MatchId;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
        GetSingleservice(ID, (err, results) => {

            if (results) {
                try {
                    if (results[0] != undefined && results[0].length != 0) {
                        fs.readdir('./resources/Team_Logos', (err, files) => {
                            if (err)
                                console.log(err);
                            else {
                                console.log("\nCurrent directory filenames:");
                                console.log(results[0]);
                                results[0].forEach((item, i) => {
                                    const idx = files.findIndex(x => x.split('.')[0] == item.TeamGuid)
                                    if (idx != -1) {
                                        item.TeamLogo = '/Team_Logos/' + files[idx];
                                    }
                                    else {
                                        item.TeamLogo = 'No Image.'
                                    }

                                    if (i == results[0].length - 1) {

                                        fs.readdir('./resources/Player_images', (err, files) => {
                                            if (err)
                                                console.log(err);
                                            else {
                                                console.log("\nCurrent directory filenames:");                                                
                                                results[0].forEach((item, i) => {
                                                    const idx1 = files.findIndex(x => x.split('.')[0] == item.PlayerGuid);
                                                    if (idx1 != -1) {
                                                        item.PlayerLogo = '/Player_images/' + files[idx1];
                                                    }
                                                    else {
                                                        item.PlayerLogo = 'No Image.'
                                                    }

                                                    if (i == results[0].length - 1) {
                                                        try {
                                                            if (results[1] != undefined && results[1].length != 0) {
                                                                fs.readdir('./resources/Team_Logos', (err, files) => {
                                                                    if (err)
                                                                        console.log(err);
                                                                    else {
                                                                        console.log("\nCurrent directory filenames:");
                                                                        console.log(results[1]);
                                                                        results[1].forEach((item, i) => {
                                                                            const idx = files.findIndex(x => x.split('.')[0] == item.TeamGuid)
                                                                            if (idx != -1) {
                                                                                item.TeamLogo = '/Team_Logos/' + files[idx];
                                                                            }
                                                                            else {
                                                                                item.TeamLogo = 'No Image.'
                                                                            }

                                                                            if (i == results[1].length - 1) {

                                                                                fs.readdir('./resources/Player_images', (err, files) => {
                                                                                    if (err)
                                                                                        console.log(err);
                                                                                    else {
                                                                                        console.log("\nCurrent directory filenames:");
                                                                                        results[1].forEach((item, i) => {
                                                                                            const idx1 = files.findIndex(x => x.split('.')[0] == item.PlayerGuid);
                                                                                            if (idx1 != -1) {
                                                                                                item.PlayerLogo = '/Player_images/' + files[idx1];
                                                                                            }
                                                                                            else {
                                                                                                item.PlayerLogo = 'No Image.'
                                                                                            }                                                                                           
                                                                                            if (i == results[1].length - 1) {
                                                                                                
                                                                                                return res.status(200).json({
                                                                                                    success: 200,
                                                                                                    TeamList1: results[0],
                                                                                                    TeamList2: results[1],
                                                                                                    Teams: results[2][0],
                                                                                                })

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
                                                                return res.status(200).json({
                                                                    success: 200,
                                                                    TeamList1: results[0],
                                                                    TeamList2: results[1],
                                                                    Teams: results[2][0],
                                                                })
                                                            }
                                                        }
                                                        catch (e) {
                                                            return res.status(500).json({
                                                                success: 500,
                                                                TeamList1: results[0],
                                                                TeamList2: results[1],
                                                                Teams: results[2][0],
                                                                error:e
                                                            })
                                                        }

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
                        return res.status(200).json({
                            success: 200,
                            TeamList1: results[0],
                            TeamList2: results[1],
                            Teams: results[2][0],
                        })
                    }
                }
                catch (e) {
                    return res.status(500).json({
                        success: 500,
                        TeamList1: null,
                        TeamList2: null,
                        error:e
                    })
                }
            }
            else {
                console.log(err);
                return res.status(500).json({
                    success: 500,
                    TeamList1: null,
                    TeamList2: null,
                    Teams: null,
                    error:err
                })
            }

        })
    },


    DeleteMatchRoute: (req, res) => {
        const ID = req.params.MatchId;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
        DeleteMatchService(ID, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.json({
                success: 200,
                message: "Match Record Delete Succesfully",

            });
        });

    },

}