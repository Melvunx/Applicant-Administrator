const offerModel = require("../models/offer.models");

module.exports.getOffers = async (req, res) => {
  try {
    const offers = await offerModel.find().sort({ createdAt: -1 });
    console.log("Toutes les offres : " + offers);
    return res.status(200).send(offers);
  } catch (err) {
    return res.status(400).json({ message: "Error to get data: " + err });
  }
};

module.exports.addOffer = async (req, res) => {
  const { title, company, url, applyDate, status } = req.body;
  try {
    const newOffer = new Offer({
      title,
      company,
      url,
      applyDate,
      status,
    });
    const savedOffer = await newOffer.save();
    console.log("Nouvelle offre ajoutée : " + savedOffer);
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'offre" });
  }
};
