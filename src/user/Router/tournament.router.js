const {createTour,getTour,getByID,deleteTour} = require("../controller/tournament.controller")
const router = require("express").Router();
router.post("/",createTour);
router.get("/",getTour);
router.get("/:ID",getByID);
router.delete("/:ID",deleteTour);
module.exports = router;