const offerModel = require("../models/offer.models");

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await offerModel.find().sort({ createdAt: -1 });
    return res.status(200).send(offers);
  } catch (err) {
    return res.status(400).json({ message: "Error to get data: " + err });
  }
};

module.exports.addOffer = async (req, res) => {
  const newOffer = offerModel({
    title: req.body.title,
    company: req.body.company,
    url: req.body.url,
    applyDate: req.body.applyDate,
    status: req.body.status,
  });

  try {
    const savedOffer = await newOffer.save();
    return res.status(201).json(savedOffer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
