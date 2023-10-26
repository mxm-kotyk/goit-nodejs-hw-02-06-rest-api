import nodemailer from "nodemailer";

const { ZOHO_EMAIL, ZOHO_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: ZOHO_EMAIL,
    pass: ZOHO_PASSWORD,
  },
});

async function sendEmail(data) {
  const email = { ...data, from: ZOHO_EMAIL };
  await transporter.sendMail(email);
}

export default sendEmail;
