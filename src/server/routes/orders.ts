import { OrderSchema } from "@/lib/zod";
import { publicProcedure, router } from "@/server/trpc";
import db from "@/services/db";
import { revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";

const getCachedOrders = unstable_cache(
  async () =>
    db.orders.findMany({
      include: { book: true, user: true },
      orderBy: { createdAt: "asc" },
    }),
  ["orders"],
  {
    tags: ["orders"],
  },
);

export const Orders = router({
  getAllOrders: publicProcedure.query(async () => {
    return await getCachedOrders();
  }),

  getOrders: publicProcedure.input(z.string()).query(async ({ input }) => {
    const orders = (await getCachedOrders()).filter(
      (order) => order.userId === input,
    );

    return orders;
  }),

  createOrder: publicProcedure
    .input(OrderSchema)
    .mutation(async ({ input }) => {
      const order = await db.orders.create({
        data: {
          userId: input.userId,
          booksId: input.booksId,
        },
      });

      await db.books.update({
        where: {
          id: input.booksId,
        },
        data: {
          available: false,
        },
      });

      revalidateTag("orders");
      revalidateTag("books");

      return order;
    }),

  updateOrder: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const order = await db.orders.update({
      where: { id: input },
      data: {
        book: {
          update: {
            available: true,
          },
        },
        completed: true,
      },
    });

    revalidateTag("orders");
    revalidateTag("books");

    return order;
  }),
});
