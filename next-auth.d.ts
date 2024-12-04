// src/types/next-auth.d.ts
import "next-auth";
import { Roles } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles[];
    verified: boolean;
    banned: boolean;
  }

  interface Session {
    user: User;
  }
}
