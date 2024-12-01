"use server";

import { server } from "@/services/trpc/server";
import nodemailer from "nodemailer";

const resend = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function checkOrders() {
  const orders = (await server.Orders.getAllOrders()).filter(
    (o) => !o.completed,
  );

  orders.forEach((order) => {
    if (new Date(order.deadline).toDateString() === new Date().toDateString()) {
      resend.sendMail({
        from: process.env.EMAIL,
        to: order.user.email,
        subject: `Książka ${order.book.title}`,
        html: `<h1>Prosze oddać książke ${order.book.title} autorstwa: ${order.book.author} w przeciągu 3 dni roboczych</h1>`,
      });
    }
  });
}
