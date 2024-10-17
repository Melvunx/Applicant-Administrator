const router = require("express").Router();
const { getOffers, addOffer } = require("../controller/offer.controller");

router.get("/", getOffers);
router.post("/", addOffer);

module.exports = router;
