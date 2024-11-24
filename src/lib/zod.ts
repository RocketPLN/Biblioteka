import { Genre } from "@prisma/client";
import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1).max(100),
  author: z.string().min(3).max(120),
  release: z.string(),
  available: z.boolean(),
  genre: z.nativeEnum(Genre),
});

export const UserSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export const OrderSchema = z.object({
  userId: z.string(),
  booksId: z.string(),
});
