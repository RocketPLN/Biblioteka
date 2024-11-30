"use client";

import { Books, Genre } from "@prisma/client";
import { DateRange } from "react-day-picker";

import useBooks from "@/hooks/useBooks";

import BookCard from "@/components/BookCard";
import Filters from "./filters";

function Render({ books }: { books: Books[] }) {
  const { query, mutation } = useBooks(books);

  const handleFilter = ({
    search,
    genres,
    date,
  }: {
    search: string;
    genres: Genre[];
    date: DateRange;
  }) => {
    mutation.mutate({ search, genres, date });
  };

  const filteredBooks = mutation.data ? mutation.data : query.data;

  return (
    <>
      <Filters handler={handleFilter} className="sticky left-0 top-2 m-2" />
      <div className="flex w-full flex-wrap gap-2 p-2">
        {filteredBooks?.length !== 0 ? (
          <>
            {filteredBooks?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </>
        ) : (
          <span className="col-span-5 flex h-full w-full items-center justify-center text-3xl">
            Not Found
          </span>
        )}
      </div>
    </>
  );
}

export default Render;
