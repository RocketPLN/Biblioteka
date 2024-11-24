"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";

import { BookSchema } from "@/lib/zod";
import { Genre } from "@prisma/client";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

function Filters({
  handler,
  className,
}: {
  handler: ({
    search,
    genres,
    date,
  }: {
    search: string;
    genres: Genre[];
    date: DateRange;
  }) => void;
  className?: ClassNameValue;
}) {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const handlerCheck = (genre: Genre, checked: CheckedState) => {
    const updatedGenres = checked
      ? [...genres, genre]
      : genres.filter((g) => g !== genre);

    setGenres(updatedGenres);
    handler({ search, genres: updatedGenres, date });
  };

  return (
    <div
      className={cn(
        "flex h-fit flex-col gap-3 rounded-md border-2 p-2",
        className,
      )}
    >
      <h1 className="text-center text-lg font-bold">Filtry</h1>
      <span>
        <Input
          id="search"
          onChange={(e) => {
            setSearch(e.target.value);
            handler({ search: e.target.value, genres, date });
          }}
          className="border-foreground/40"
        />
        <Label htmlFor="search" className="text-sm text-muted-foreground">
          Szukaj po tytule lub autorze
        </Label>
      </span>
      <div className="h-1/3 px-2">
        <ScrollArea className="h-full rounded-md border-y p-2">
          {Object.values(BookSchema.shape.genre.enum).map((genre) => (
            <div key={genre} className="flex items-center gap-2">
              <Checkbox
                id={genre}
                checked={genres.includes(genre)}
                onCheckedChange={(checked) => handlerCheck(genre, checked)}
              />
              <Label htmlFor={genre} className="text-lg capitalize">
                {genre.toLowerCase()}
              </Label>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="w-auto rounded-md border p-0">
        <Calendar
          mode="range"
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          selected={date}
          onSelect={(date) => {
            setDate(date as DateRange);
            const Date = date as DateRange;
            handler({ search, genres, date: Date });
          }}
        />
      </div>
      <Button
        onClick={() => {
          setSearch("");
          setGenres([]);
          setDate({ from: new Date("1900-01-01"), to: new Date() });
          handler({
            search: "",
            genres: [],
            date: { from: new Date("1900-01-01"), to: new Date() },
          });
        }}
      >
        Clear
      </Button>
    </div>
  );
}

export default Filters;
