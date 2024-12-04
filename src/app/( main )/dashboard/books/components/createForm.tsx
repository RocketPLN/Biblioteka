import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/services/trpc/api";

import { cn } from "@/lib/utils";
import { BookSchema } from "@/lib/zod";

import {
  SelectGenreContent,
  SelectGenreTrigger,
} from "@/components/form/selectGenre";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { useUploadThing } from "@/services/uploadthing";
import { useDropzone } from "@uploadthing/react";

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

const BookSchemaForm = BookSchema.merge(z.object({ release: z.date() }));

const CreateBookForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("bookCoverUploader", {
    onClientUploadComplete: () => {
      toast.success("uploaded successfully!");
    },
    onUploadError: () => {
      toast.error("error occurred while uploading");
    },
    onUploadBegin: (fileName) => {
      console.log("upload has begun for", fileName);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  const router = useRouter();
  const createBook = api.Books.createBook.useMutation();

  const form = useForm<z.infer<typeof BookSchemaForm>>({
    resolver: zodResolver(BookSchemaForm),
    defaultValues: {
      author: "",
      title: "",
      description: "",
      available: true,
      release: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof BookSchemaForm>) {
    const file = await startUpload(files);

    await createBook.mutateAsync({
      ...data,
      release: data.release.toDateString(),
      imageKey: file?.at(0)?.key as string,
    });

    toast.success("Udało się dodać książke");
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
              <FormLabel>Gatunek</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectGenreTrigger />
                </FormControl>
                <SelectGenreContent />
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data Wydania</FormLabel>
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
                        <span>Wybierz Date</span>
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
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          {...getRootProps()}
          className="w-fit cursor-pointer rounded-sm border bg-muted p-2"
        >
          <input {...getInputProps()} disabled={files.length > 0} />
          {files.length == 0 ? "Przeciągni tu pliki" : "Dodałeś juz pliki"}
        </div>
        <DialogClose asChild>
          <Button type="submit">Dodaj</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default CreateBookForm;
