const router = require("express").Router();
const { AccessToken, Role } = require ('@huddle01/server-sdk/auth');


router.post("/", async (req, res) => {
    try {
        console.log('Api enter')
            const body = req.body;
            const accessToken = new AccessToken({
                apiKey: process.env.Huddle_APIKey,
                roomId: body.roomId,
                role: body.role,
                permissions: {
                    admin: true,
                    canConsume: true,
                    canProduce: true,
                    canProduceSources: {
                        cam: true,
                        mic: true,
                        screen: true,
                    },
                    canRecvData: true,
                    canSendData: true,
                    canUpdateMetadata: true,
                },
                options: {
                    metadata: {
                        walletAddress: "axit.eth"
                    },
                },
            });
            console.log('Api step 1')
            const token = await accessToken.toJwt();
            console.log('Token step ',token)
            if(token!='')
            {
                console.log('Token step if ',token) 
                res.status(200).send({"Token":token});
            }
            else{
                console.log('Token step else ',token)
                res.status(201).send({"Message":"Token is nit gernated"});
            }
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;