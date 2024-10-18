const router = require("express").Router();
const { getOffers, addOffer } = require("../controller/offer.controller");

router.get("/offers", getOffers);
router.post("/addOffer", addOffer);

module.exports = router;
