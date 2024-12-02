"use server";

import nodemailer from "nodemailer";

const resend = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function Send({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  resend.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
}
