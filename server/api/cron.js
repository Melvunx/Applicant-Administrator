import { sendScheduledEmails } from "..";

export default async function handler() {
  await sendScheduledEmails();
}
