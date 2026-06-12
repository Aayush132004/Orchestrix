import axios from 'axios';
import 'dotenv/config';

export async function sendEmail(to: string, body: string): Promise<void> {
  const senderEmail = process.env.MAIL_FROM || "aayushsharma132004@gmail.com";
  const apiKey = process.env.BREVO_KEY;

  if (!apiKey) {
    throw new Error("BREVO_KEY is not defined in the environment variables.");
  }

  console.log(`Sending email to ${to} via Brevo HTTP API...`);

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: { email: senderEmail },
      to: [{ email: to }],
      subject: `Workflow Alert`,
      textContent: body
    },
    {
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      timeout: 10000
    }
  );

  console.log("Email sent successfully via HTTP API.");
}


