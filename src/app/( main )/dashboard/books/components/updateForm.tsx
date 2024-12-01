import { zodResolver } from "@hookform/resolvers/zod";
import { Books } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BookSchema } from "@/lib/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectGenreContent,
  SelectGenreTrigger,
} from "@/components/form/selectGenre";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { api } from "@/services/trpc/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

const BookFields: {
  name: keyof z.infer<typeof BookSchema>;
  label: string;
  type: HTMLInputTypeAttribute | "textarea";
}[] = [
  {
    name: "title",
    label: "Tytuł",
    type: "text",
  },
  {
    name: "author",
    label: "Autor",
    type: "text",
  },
  {
    name: "description",
    label: "Opis",
    type: "textarea",
  },
];

const UpdateBookForm = ({
  initialData,
  id,
}: {
  initialData: Books;
  id: string;
}) => {
  const updateBook = api.Books.updateBook.useMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      ...initialData,
      release: new Date(initialData.release).toDateString(),
    },
  });

  async function onSubmit(data: z.infer<typeof BookSchema>) {
    await updateBook.mutateAsync({
      ...data,
      id: id,
    });

    toast.success("Udało się zaktualizować informacje");

    router.prefetch("/dashboard/books");
    router.push("/dashboard/books");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {BookFields.map((bfield) => (
          <FormField
            key={bfield.name}
            control={form.control}
            name={bfield.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{bfield.label}</FormLabel>
                <FormControl>
                  {bfield.type === "textarea" ? (
                    <Textarea
                      {...field}
                      value={field.value as string}
                      className="h-fit"
                    />
                  ) : (
                    <Input
                      {...field}
                      type={bfield.type}
                      value={field.value as string}
                    />
                  )}
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectGenreTrigger />
                </FormControl>
                <SelectGenreContent />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Edytuj</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default UpdateBookForm;
