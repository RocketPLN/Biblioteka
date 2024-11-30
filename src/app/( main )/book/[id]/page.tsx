import Image from "next/image";

import { server } from "@/services/trpc/server";
import { auth } from "@/services/auth";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import DialogBook from "@/components/DialogBook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  const book = await server.Books.getBook({ id: (await params).id });

  const releaseDate = new Date(book.release).toLocaleDateString();

  return (
    <div
      className={cn(
        "grid h-[calc(100vh*0.90)] w-full grid-cols-5 gap-2 p-4",
        !book.available && "opacity-50",
      )}
    >
      <Alert className="absolute left-1/2 top-1/2 z-10 w-fit -translate-x-1/2 -translate-y-1/2 transform bg-muted-foreground text-muted">
        <AlertTitle className="text-center text-3xl font-black">
          Nie dostępna
        </AlertTitle>
        <AlertDescription className="text-xl font-semibold">
          Książka już została wypożyczona przez innego użytkownika
        </AlertDescription>
      </Alert>
      <div className="col-span-2 h-full overflow-hidden rounded-md border">
        <Image
          src="https://wolnelektury.pl/media/book/cover_clean/saint-exupery-maly-ksiaze_uaQHsUD.jpg"
          alt={book.title}
          width={0}
          height={0}
          sizes="100%"
          className="w-full object-contain"
        />
      </div>
      <div className="col-span-3 flex flex-col items-center p-2">
        <h1 className="text-3xl font-bold capitalize">Tytuł: {book.title}</h1>
        <p className="py-2 text-xl font-semibold capitalize">
          Author: {book.author}
        </p>
        <p className="flex gap-2 py-6 text-lg capitalize">
          <span>Gatunek: {book.genre.toLowerCase()}</span>
          <span>Data Wydania: {releaseDate}</span>
        </p>
        <ScrollArea className="my-4 h-[50vh] w-4/5 grow text-pretty rounded-sm border p-2">
          {book.description}
        </ScrollArea>
        <DialogBook bookId={book.id} userId={session?.user.id as string} />
      </div>
    </div>
  );
};

export default Page;
