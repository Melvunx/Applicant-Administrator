const nodemailer = require("nodemailer");
const offerModel = require("../models/offer.models");
const mongoose = require("mongoose");
mongoose.set("debug", true);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_ADDRESS,
    pass: process.env.PASS_ADDRESS,
  },
});

const sendMail = async (transporter, mailOptions) => {
  try {
    console.log("Tentative d'envoi d'un email...");
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Une erreur est survenue lors de l'envoi du mail ! ", error);
  }
};

export default async function handler(req, res) {
  if (req.headers["authorization"] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  } else if (req.method === "GET") {
    try {
      // Vérifier la connexion SMTP
      await transporter.verify();
      console.log("Le serveur SMTP est prêt à prendre nos messages !");

      // Récupération des offres
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      console.log("Date de comparaison : ", oneWeekAgo);

      const offers = await offerModel
        .find({
          applyDate: { $lte: oneWeekAgo },
          archived: false,
          status: "Envoyé",
        })
        .exec();

      console.log("Offres récupérées : ", offers);

      if (offers.length === 0) {
        console.log("Aucune offre trouvée pour l'envoi de mail");
        return res.status(200).json({ message: "Aucune offre à relancer." });
      }

      // Créez un tableau de promesses d'envoi d'email
      const emailPromises = offers.map(async (offer) => {
        console.log("Traitement de l'offre : ", offer.company);

        const relanceMail = {
          from: {
            name: "Rappeleur de relance",
            address: process.env.USER_ADDRESS,
          },
          to: process.env.USER_ADDRESS,
          subject: `Relance de Candidature - Une semaine depuis ma candidature chez ${offer.company}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
              <h1 style="font-size: 24px; color: #4CAF50;">Bonjour mon Melv,</h1>
              <p style="font-size: 16px; line-height: 1.6;">
                Cela fait <strong>une semaine</strong> que tu as postulé chez 
                <strong>${offer.company}</strong> avec 
                ${
                  offer.type === "Candidature spontanée"
                    ? "<em>une candidature spontanée</em>"
                    : `l'offre <strong>${offer.title}</strong>`
                }.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Il est temps de relancer ta candidature en renvoyant un e-mail. Ne perds pas de temps !
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <a href="${
                  offer.url
                }" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Voir l'offre</a>
              </div>
              <br/>
              <p style="font-size: 16px; line-height: 1.6;">
                Cordialement,<br/>
                Toi même.<br/>
              </p>
            </div>
          `,
        };

        await sendMail(transporter, relanceMail);
        console.log(
          `L'email de relance pour l'entreprise ${offer.company} a bien été envoyé !`
        );
      });

      // Attendre que tous les emails aient été envoyés
      await Promise.all(emailPromises);

      // Envoyer la réponse une fois que les emails ont été envoyés
      res
        .status(200)
        .json({ message: "Emails de relance envoyés avec succès." });

      // Envoyer la réponse une fois que les emails ont été envoyés
      res
        .status(200)
        .json({ message: "Emails de relance envoyés avec succès." });
    } catch (error) {
      console.error(
        "Erreur lors de l'exécution de la tâche planifiée :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de l'exécution de la tâche planifiée.",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie !");

    // Essayez de récupérer les offres
    const offers = await offerModel.find().lean().exec();
    console.log("Offres récupérées :", offers);
  } catch (error) {
    console.error(
      "Erreur lors de la connexion ou de la récupération des offres :",
      error
    );
  } finally {
    mongoose.disconnect(); // Déconnectez-vous après le test
  }
}

testConnection();
