import { sendScheduledEmails } from "..";

export default async function handler(req, res) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end("Unauthorized");
  } else if (req.method === "GET") {
    await sendScheduledEmails();
    res.status(200).json({ message: "Scheduled task executed successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
