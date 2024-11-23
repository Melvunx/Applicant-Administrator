const router = require("express").Router();
const {
  getOffers,
  addOffer,
  toggleArchiveOffer,
  modifyStatus,
  deleteOffer,
} = require("../controller/offer.controller");

router.get("/", getOffers);
router.post("/addOffer", addOffer);
router.put("/:id/archive", toggleArchiveOffer);
router.put("/:id/status", modifyStatus);
router.delete("/archive/:id", deleteOffer);

module.exports = router;
