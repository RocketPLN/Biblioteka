import { server } from "@/services/trpc/server";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const Page = async () => {
  const books = await server.Books.getBooks();
  return (
    <div>
      <DataTable columns={columns} data={books} />
    </div>
  );
};

export default Page;
