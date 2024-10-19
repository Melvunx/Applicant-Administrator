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
  const { title, type, company, url, applyDate, status } = req.body;

  if (!type || !company || !url || !applyDate) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  // Si le type est "Candidature sur offre", le titre doit être présent
  if (type === "Candidature sur offre" && !title) {
    return res
      .status(400)
      .json({ message: "Le titre est requis pour une candidature sur offre" });
  }

  try {
    const newOffer = new offerModel({
      title,
      type,
      company,
      url,
      applyDate,
      status,
    });
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    console.error("Erreur lors de l'ajout à la base de données :", error); // Log de l'erreur
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await offerModel.findById(id);

    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    if (!offer.archived) {
      return res.status(400).json({
        message: "Vous ne pouvez supprimer que les offres archivées.",
      });
    } else {
      await offerModel.findByIdAndDelete(id);
      console.log("Offre supprimée ! ", offer);

      return res.status(200).json({ message: "Offre supprimée avec succès !" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre : ", error);
    return res
      .status(500)
      .json({ error: "Erreur durant la suppression de l'offre" });
  }
};

module.exports.toggleArchiveOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { archived } = req.body; // true pour archiver, false pour désarchiver

    const offer = await offerModel.findByIdAndUpdate(
      id,
      { archived },
      { new: true }
    );

    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    } else {
      const message = archived
        ? "Offre archivée avec succès !"
        : "Offre désarchivée avec succès !";

      console.log(message, offer);
      return res.status(200).json({ message });
    }
  } catch (error) {
    console.error(
      `Erreur durant le ${archived ? "archivage" : "désarchivage"} de l'offre : `,
      error
    );
    return res.status(500).json({
      error: `Erreur durant le ${archived ? "archivage" : "désarchivage"} de l'offre`,
    });
  }
};