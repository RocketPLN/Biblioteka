import { revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";

import { BookSchema } from "@/lib/zod";
import { publicProcedure, router } from "@/server/trpc";
import db from "@/services/db";

const getCachedBooks = unstable_cache(
  async () => db.books.findMany(),
  ["books"],
  {
    tags: ["books"],
  },
);

export const Books = router({
  getBooks: publicProcedure.query(async () => {
    return await getCachedBooks();
  }),

  getBook: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const book = (await getCachedBooks()).filter(
        (book) => book.id === input.id,
      );

      return book[0];
    }),

  createBook: publicProcedure
    .input(BookSchema.extend({ imageKey: z.string() }))
    .mutation(async ({ input }) => {
      const book = await db.books.create({
        data: {
          title: input.title,
          author: input.author,
          release: new Date(input.release),
          available: input.available,
          description: input.description,
          genre: input.genre,
          imagekey: input.imageKey,
        },
      });

      revalidateTag("books");

      return book;
    }),

  updateBook: publicProcedure
    .input(BookSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const book = await db.books.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          author: input.author,
          release: new Date(input.release),
          available: input.available,
          description: input.description,
          genre: input.genre,
        },
      });

      revalidateTag("books");

      return book;
    }),

  deleteBook: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const book = await db.books.delete({
      where: {
        id: input,
      },
    });

    revalidateTag("books");

    return book;
  }),
});
