import nodemailer from "nodemailer"
import 'dotenv/config';
export function sendEmail(to:string,body:string){

const transporter = nodemailer.createTransport({
    // @ts-ignore
  host: process.env.SMTP_HOST ,
  port: process.env.SMTP_PORT,
  secure: false, // true only for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.BREVO_KEY
  }
});
async function sendMail() {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: to,
    subject: `mail from ${to}`,
    text: body
  });

  console.log("Email sent");
}

sendMail().catch(console.error);

}

