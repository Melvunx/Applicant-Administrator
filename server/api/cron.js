import { sendScheduledEmails } from "..";

export default async function handler(req, res) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end("Unauthorized");
  } else {
    await sendScheduledEmails();
  }
}
