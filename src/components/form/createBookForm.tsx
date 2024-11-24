"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { BookSchema } from "@/lib/zod";

import { api } from "@/services/trpc/api";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectGenreContent,
  SelectGenreTrigger,
} from "@/components/form/selectGenre";

import { CalendarIcon } from "lucide-react";

const formField: {
  name: "title" | "author";
  type: string;
}[] = [
  {
    name: "title",
    type: "text",
  },
  {
    name: "author",
    type: "text",
  },
];

const BookSchemaForm = BookSchema.merge(z.object({ release: z.date() }));

export function CreateBookForm() {
  const createBook = api.Books.createBook.useMutation();

  const form = useForm<z.infer<typeof BookSchemaForm>>({
    resolver: zodResolver(BookSchemaForm),
    defaultValues: {
      title: "",
      author: "",
      available: true,
      release: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof BookSchemaForm>) {
    try {
      await createBook.mutateAsync({
        ...data,
        release: new Date(data.release).toDateString(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[calc(100vw/2)]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formField.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="release"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Release</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-1/3 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd.MM.yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectGenreTrigger />
                  </FormControl>
                  <SelectGenreContent />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
