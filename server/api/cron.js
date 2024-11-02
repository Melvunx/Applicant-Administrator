const nodemailer = require("nodemailer");
const offerModel = require("./models/offer.models");

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

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
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
const sendScheduledEmails = async () => {
  console.log("Vérification des offres envoyées il y a une semaine...");

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const offers = await offerModel.find({
      applyDate: { $lte: oneWeekAgo },
      archived: false,
      status: "Envoyé",
    });

    if (offers.length === 0) {
      console.log("Aucune offre trouvée pour l'envoi de mail");
    } else {
      for (const offer of offers) {
        console.log("Offres envoyées il y a une semaine : ", offer);

        const relanceMail = {
          from: {
            name: "Rappeleur de relance",
            address: process.env.USER_ADDRESS,
          },
          to: [process.env.USER_ADDRESS],
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
      }
    }
  } catch (error) {
    console.error("Erreur lors de la vérification des offres : ", error);
  }
};

export default async function handler(req, res) {
  if (req.headers["authorization"] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  } else if (req.method === "GET") {
    try {
      await sendScheduledEmails();
      res.status(200).json({ message: "Scheduled task executed successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error executing scheduled task",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
