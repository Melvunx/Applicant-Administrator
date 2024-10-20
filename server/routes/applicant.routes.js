const router = require("express").Router();
const {
  getOffers,
  addOffer,
  toggleArchiveOffer,
  modifyStatus,
  deleteOffer,
} = require("../controller/offer.controller");

router.get("/offers", getOffers);
router.post("/addOffer", addOffer);
router.put("/offers/:id/archive", toggleArchiveOffer);
router.put("/offers/:id/status", modifyStatus);
router.delete("/offers/archive/:id", deleteOffer);

module.exports = router;
