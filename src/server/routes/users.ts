import { UserSchema } from "@/lib/zod";
import { publicProcedure } from "@/server/trpc";
import db from "@/services/db";
import { User as Type } from "@prisma/client";
import { z } from "zod";

const getUsers = publicProcedure.query(async () => {
  const users: Type[] = await db.user.findMany();

  return users;
});

const createUser = publicProcedure
  .input(UserSchema)
  .mutation(async ({ input }) => {
    const user = await db.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      },
    });

    return user;
  });

const updateUser = publicProcedure
  .input(UserSchema.extend({ id: z.string(), verify: z.boolean() }))
  .mutation(async ({ input }) => {
    const user = await db.user.update({
      where: {
        id: input.id,
      },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        verified: input.verify,
      },
    });

    return user;
  });

const deleteUser = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const user = await db.user.delete({
      where: {
        id: input,
      },
    });

    return user;
  });

export const User = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
