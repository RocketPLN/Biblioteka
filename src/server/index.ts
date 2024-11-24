import { Books, Orders, User } from "@/server/routes";
import { router } from "@/server/trpc";

export const appRouter = router({
  Books,
  User,
  Orders,
});

export type AppRouter = typeof appRouter;
