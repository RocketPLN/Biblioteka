import { OrderSchema } from "@/lib/zod";
import { publicProcedure, router } from "@/server/trpc";
import db from "@/services/db";
import { revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";

const getCachedOrders = unstable_cache(
  async () => db.orders.findMany(),
  ["orders"],
  {
    tags: ["orders"],
  }
);

export const Orders = router({
  getOrders: publicProcedure.query(async () => {
    return await getCachedOrders();
  }),

  createOrder: publicProcedure.input(OrderSchema).query(async ({ input }) => {
    const order = await db.orders.create({
      data: {
        userId: input.userId,
        booksId: input.booksId,
      },
    });

    revalidateTag("orders");

    return order;
  }),

  updateOrder: publicProcedure
    .input(OrderSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const order = await db.orders.update({
        where: {
          id: input.id,
        },
        data: {
          userId: input.userId,
          booksId: input.booksId,
        },
      });

      revalidateTag("orders");

      return order;
    }),
});
