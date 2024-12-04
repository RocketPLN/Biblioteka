import { server } from "@/services/trpc/server";

import Render from "./components/render";

export default async function Page() {
  const books = (await server.Books.getBooks()).filter(
    (book) => book.available,
  );

  return (
    <div className="relative flex w-[calc(100vw-2rem)]">
      <Render books={books} />
    </div>
  );
}
