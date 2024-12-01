"use client";

import { Books } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpDown, Edit, PlusCircle } from "lucide-react";
import UpdateBookForm from "./updateForm";
import CreateBookForm from "./createForm";

export const columns: ColumnDef<Books>[] = [
  {
    accessorKey: "available",
    header: "Dostępność",
    cell: ({ row }) => {
      return (
        <Checkbox
          disabled
          defaultChecked={row.getValue("available")}
          className="rounded-sm"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tytuł
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "genre",
    header: "Gatunek",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {String(row.getValue("genre")).toLocaleLowerCase()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj książke</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <CreateBookForm />
          </DialogContent>
        </>
      );
    },
    cell: ({ row }) => {
      const book = row.original;

      return (
        <>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edytuj książkę {book.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <UpdateBookForm initialData={book} id={book.id} />
          </DialogContent>
        </>
      );
    },
  },
];
