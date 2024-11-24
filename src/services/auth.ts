import { server } from "@/services/trpc/server";
import bcrypt from "bcryptjs";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user: User | null = null;

        const { email, password } = credentials;

        const users = await server.User.getUsers();
        const tempUser = users.find((user) => user.email === email);

        if (!tempUser) {
          throw new Error("Invalid credentials");
        }

        const compare = await bcrypt.compare(
          password as string,
          tempUser.password,
        );

        if (!compare) {
          throw new Error("Invalid credentials");
        }

        user = {
          id: tempUser.id,
          email: tempUser.email,
          firstName: tempUser.firstName,
          lastName: tempUser.lastName,
          roles: tempUser.roles,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const dbUser = (await server.User.getUsers()).find(
        (u) => u.email === session.user.email,
      );

      if (!dbUser) {
        throw new Error("User not found in database");
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: dbUser.id,
          email: dbUser.email,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          roles: dbUser.roles,
        },
      };
    },
  },
});
