import {
  createOffer,
  deleteManyOffers,
  deleteOffer,
  getAllOffers,
  getOfferById,
  getSerachedOffer,
  updateOffer,
} from "@/controller/offer.controller";
import { authenticate } from "@/middleware/authentication";
import { Router } from "express";

const router = Router();

// Get offer
router.get("/", authenticate, getAllOffers);

router.get("/offer", authenticate, getSerachedOffer);

router.get("/:offerId", getOfferById);

// Create new offer
router.post("/new", authenticate, createOffer);

// Modify offer
router.put("/update", authenticate, updateOffer);

// Delete offer
router.delete("/", authenticate, deleteOffer);

router.delete("/many", authenticate, deleteManyOffers);

module.exports = router;
