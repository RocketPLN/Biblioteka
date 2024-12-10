import { server } from "@/services/trpc/server";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const books = await server.Books.getBooks();
  const session = await auth();


  if (!session?.user || !session.user.roles.includes("ADMIN")) {
    redirect("/");
  }

  return (
    <div>
      <DataTable columns={columns} data={books} />
    </div>
  );
};

export default Page;
