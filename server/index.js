const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env" });

require("./config/database");
const offerModel = require("./models/offer.models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require("./routes/applicant.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT} !`);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_ADDRESS,
    pass: process.env.PASS_ADDRESS,
  },
});

const mailOptions = {
  from: {
    name: "Rappeleur de relance",
    address: process.env.USER_ADDRESS,
  },
  to: [process.env.USER_ADDRESS],
  subject: "Relance de Candidature",
  text: ` Bonjour mon reuf,
  
Tu dois relancer cette demande car cela fait une semaine qu'elle a été envoyée !

Cordialement,
Toi même.
`,
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("L'email à bien été envoyée !");
  } catch (error) {
    console.error("Une erreur est survenue lors de l'envoie du mail ! ", error);
  }
};

//Vérifier la connexion SMTP
transporter.verify((error, succes) => {
  if (error) return console.log("Erreur de connextion SMTP ", error);
  else if (succes)
    return console.log("Le serveur SMTP est prêt à prendre nos messages !");
});

//Envoie de tâche planifiée
cron.schedule("* * * * *", async () => {
  console.log("Vérification des offres envoyées il y a 1 minute...");

  const oneMinuteAgo = new Date();
  oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

  try {
    const offers = await offerModel.find({
      applyDate: { $lte: oneMinuteAgo },
      archived: false,
      status: "Envoyé",
    });

    //Envoie d'email
    offers.forEach(async (offer) => {
      console.log("Offres  envoyées il y a 1 minute : ", offer);
      const relanceMail = {
        from: {
          name: "Rappeleur de relance",
          address: process.env.USER_ADDRESS,
        },
        to: [process.env.USER_ADDRESS],
        subject: `Relance de Candidature - 1 minute depuis ma candidature chez ${offer.company}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="font-size: 24px; color: #4CAF50;">Bonjour mon Melv,</h1>
            <p style="font-size: 16px; line-height: 1.6;">
              Cela fait <strong>1 minute</strong> que tu as postulé chez 
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
    });
  } catch (error) {
    console.error("Erreur lors de la vérification des offres : ", error);
  }
});

// sendMail(transporter, mailOptions);
