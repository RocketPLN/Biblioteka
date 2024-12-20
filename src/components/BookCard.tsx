import { Books } from "@prisma/client";
import { Separator } from "./ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function BookCard({ book }: { book: Books }) {
  const date = new Date(book.release).toLocaleDateString();

  return (
    <div className="flex h-full w-full flex-col items-center space-y-2 rounded-md border bg-muted/40 p-2">
      <h1 className="mb-4 text-xl font-bold capitalize">{book.title}</h1>
      <div className="flex h-3/4 w-full items-center justify-center overflow-hidden rounded-md border bg-white">
        <Image
          src={`https://utfs.io/f/${book.imagekey}`}
          alt={book.title}
          width={0}
          height={0}
          sizes="100%"
          className="w-full object-contain"
        />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <span className="flex h-1/2 space-x-4 capitalize">
          <span>{book.genre.at(0) + book.genre.slice(1).toLowerCase()}</span>
          <Separator orientation="vertical" />
          <span>{date}</span>
        </span>
        <Separator />
        <span>{book.author}</span>
      </div>
      <Link href={`/book/${book.id}`} className="w-full">
        <Button className="w-full" variant="outline">
          Zobacz
        </Button>
      </Link>
    </div>
  );
}

export default BookCard;
