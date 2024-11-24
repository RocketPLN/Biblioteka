import { Books } from "@prisma/client";
import { Separator } from "./ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function BookCard({ book }: { book: Books }) {
  const date = new Date(book.release).toLocaleDateString();

  return (
    <div className="flex h-[calc(100vh/3)] flex-col items-center space-y-2 rounded-md border border-primary bg-primary/10 p-2">
      <h1 className="text-xl font-bold capitalize">{book.title}</h1>
      <div className="flex h-3/4 w-full items-center justify-center overflow-hidden rounded-md bg-white">
        <Image
          src="https://wolnelektury.pl/media/book/cover_clean/saint-exupery-maly-ksiaze_uaQHsUD.jpg"
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
        <Button className="w-full">Zobacz</Button>
      </Link>
    </div>
  );
}

export default BookCard;
