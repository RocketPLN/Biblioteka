"use client";

import { Genre } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

import { api } from "@/services/trpc/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search } from "lucide-react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { data: books } = api.Books.getBooks.useQuery();

  const filteredBoooks = books?.filter(
    (b) =>
      (b.title.includes(search) || b.author.includes(search)) && b.available,
  );

  return (
    <div className="relative w-[calc(100vw/4)] rounded-md bg-muted">
      <div className="flex w-full items-center overflow-hidden rounded-md border bg-background/40 shadow-sm">
        <Input
          placeholder="Wyszukaj książek poprzez tytuł lub autora"
          className="h-10 rounded-none border-none text-2xl shadow-none outline-none focus:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="h-fit w-fit border-l bg-background/60 p-2">
          <Search color="hsl(var(--muted-foreground))" />
        </div>
      </div>
      {search.length > 0 && (
        <div className="absolute left-1/2 z-10 flex h-fit w-[70vw] -translate-x-1/2 transform flex-col gap-1 rounded-sm border bg-muted/40 px-2 py-3 backdrop-blur-md">
          {filteredBoooks?.length ? (
            filteredBoooks?.map((book) => (
              <SearchItem book={book} key={book.id} />
            ))
          ) : (
            <span className="rounded-sm border-b bg-background p-2 text-center text-lg font-bold capitalize shadow-sm">
              Nie znaleziono
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

const SearchItem = ({
  book,
}: {
  book: {
    id: string;
    author: string;
    title: string;
    genre: Genre;
  };
}) => {
  return (
    <div className="flex items-center gap-2 rounded-sm border-b bg-background p-2 capitalize shadow-sm">
      <div className="flex grow flex-col">
        <span className="text-lg font-bold">
          {book.title.toLocaleLowerCase()}
        </span>
        <span className="text-sm font-semibold text-muted-foreground">
          {book.author.toLocaleLowerCase()}
        </span>
      </div>
      <Link href={`/book/${book.id}`}>
        <Button>
          <ExternalLink />
        </Button>
      </Link>
    </div>
  );
};
