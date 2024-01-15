const { getAll } = require("../services/getPlayerAttribute.service");
const fs = require('fs');
module.exports = {


    getPlayerAttribute: (req, res) => {
        // Validate User Here 
        // Then generate JWT Token 
        const playerID_1 = req.params.playerID_1;
        const playerID_2 = req.params.playerID_2;
        if (playerID_1 === 'null' || playerID_1 === 'undefined' || playerID_1 == null || playerID_1 == undefined || playerID_2 === 'null' || playerID_2 === 'undefined' || playerID_2 == null || playerID_2 == undefined) {

            return res.status(500).json({
                success: 0,
                error: { Message: "Undefined or null parameter error", Status: 500 }
            });

        }
        getAll(playerID_1, playerID_2, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            if (results[0] == [] || results[0] == undefined || results[0] == null || results[0].length == 0) {
                return res.json({
                    success: 200,
                    TeamList: null,
                    message: "No data found."
                });
            }
            if (results[0] != [] && results[0] != undefined && results[0].length != 0) {

                fs.readdir('./resources/Player_images', (err, files) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("\nCurrent directory filenames:");
                        results[0].forEach((item, i) => {
                            const idx1 = files.findIndex(x => x.split('.')[0] == item.PlayerGuid1);
                            const idx2 = files.findIndex(x => x.split('.')[0] == item.PlayerGuid2)
                            if (idx1 != -1) {
                                item.Player1Logo = '/Player_images/' + files[idx1];
                            }
                            else {
                                item.Team1Logo = 'No Image.'
                            }
                            if (idx2 != -1) {
                                item.Player2Logo = '/Player_images/' + files[idx2];
                            }
                            else {
                                item.Team2Logo = 'No Image.'
                            }
                            if (i == results[0].length - 1) {
                                return res.json({
                                    success: 200,
                                    data: results[0]
                                });
                            }
                        })

                    }
                });

            }
            else {
                return res.json({
                    success: 200,
                    TournamentList: results[0]
                });
            }
        });

    },

}