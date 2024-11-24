import { server } from "@/services/trpc/server";
import Render from "./components/render";

export default async function Home() {
  const books = (await server.Books.getBooks()).filter(
    (book) => book.available,
  );

  return <Render books={books} />;
}
