const router = require("express").Router();
router.get("/", async (req, res) => {
    try {
        const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'x-api-key': process.env.Huddle_APIKey,
            },
            body: JSON.stringify({
                title: "Huddle01-Test",
                roomType:'AUDIO'
            }),
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/rooms", async (req, res) => {
    try {
        const response = await fetch("https://api.huddle01.com/api/v1/get-rooms", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'x-api-key': process.env.Huddle_APIKey,
            },
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
