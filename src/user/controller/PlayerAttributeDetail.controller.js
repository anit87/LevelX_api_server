const { SaveUpdatePlayerAttributeDetailService, GetAllPlayerAttributeDetailservice, GetSingleservice, DeletePlayerAttributeDetailService,SavePlayerAttributeDetail } = require("../services/PlayerAttributeDetail.services");
module.exports = {
    saveUpdatePlayerAttributeDetailRouter: (req, res) => {
        const PlayerAttributeDetailList = req.body;
        var i=0;
        for  (let x of PlayerAttributeDetailList) {
        if (( x.PlayerDetailId == undefined||x.PlayerID == undefined ||   x.AttributeId == undefined ||  x.AttributeValue == undefined ||  x.CreatedBy == undefined ||  x.UpdatedBy == undefined)
        || (x.PlayerID == null ||   x.AttributeId == null ||  x.AttributeValue == null ||  x.CreatedBy == null ||  x.UpdatedBy == null)) 
          { 
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error in list " + i,x,  Status: 400 }
            });
        }
            i =i+1;
        }
        SavePlayerAttributeDetail(PlayerAttributeDetailList, (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 200,
                message: "Data Save Sucessfully"

            });
        });

    },

    GetAllPlayerAttributeDetailrouter: (req, res) => {
        debugger;
        const ID = req.params.ID;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
        GetAllPlayerAttributeDetailservice(ID,(err, results) => {
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
                    message: "Data Found Succesfully",
                    PlayerAttributeDetailList:results==null?results:results[0],
                });
            }
        })
    },
    
    GetSinglePlayerAttributeDetailrouter: (req, res) => {
        debugger;
        const ID = req.params.ID;
        if (ID === 'null' || ID === 'undefined' || ID == null || ID == undefined ){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
        GetSingleservice(ID, (err, results) => {
            if (res) {
                return res.json({
                    success: 200,

                    PlayerAttributeDetail: results==null?results:results[0]
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


    DeletePlayerAttributeDetailRoute: (req, res) => {
        const PrivateChatId = req.params.ID;
        if (PrivateChatId === 'null' || PrivateChatId === 'undefined' || PrivateChatId == null || PrivateChatId == undefined ){
            return res.status(400).json ({
                success :0,
                error:{ Message: "Undefined or null parameter error", Status: 400 }
            });
           
        }
        DeletePlayerAttributeDetailService(PrivateChatId, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.json({
                success: 200,
                message: "Data  Delete Succesfully",

            });
        });

    }


}