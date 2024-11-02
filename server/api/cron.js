const { sendScheduledEmails } = require("../index");

export default async function handler(req, res) {
  if (req.headers["authorization"] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  } else if (req.method === "GET") {
    try {
      await sendScheduledEmails();
      res.status(200).json({ message: "Scheduled task executed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error executing scheduled task", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
