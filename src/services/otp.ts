"use server";

import nodemailer from "nodemailer";

const resend = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendOtp(email: string, otp: string) {
  return resend.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: `Kod weryfikacyjny: ${otp}`,
    html: `<h1>Kod weryfikacyjny</h1><p>${otp}</p>`,
  });
}

export async function generateOTP() {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return Promise.resolve(otp);
}

export async function verifyOTP(otp: string, clientOTP: string) {
  return new Promise((resolve) => {
    if (otp === clientOTP) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
