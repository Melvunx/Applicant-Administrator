const router = require("express").Router();
const {
  getOffers,
  addOffer,
  archiveOffer,
  deleteOffer,
} = require("../controller/offer.controller");

router.get("/offers", getOffers);
router.post("/addOffer", addOffer);
router.delete("/offers/:id/archive", archiveOffer);
router.delete("/offers/archive/:id", deleteOffer);

module.exports = router;
