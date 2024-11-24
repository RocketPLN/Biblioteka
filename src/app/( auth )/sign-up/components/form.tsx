"use client";

import { useForm } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { UserSchema } from "@/lib/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpFields: {
  name: keyof z.infer<typeof UserSchema>;
  label: string;
  type: HTMLInputTypeAttribute;
}[] = [
  {
    name: "firstName",
    label: "Imię",
    type: "text",
  },
  {
    name: "lastName",
    label: "Nazwisko",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Hasło",
    type: "password",
  },
];

function SignUpForm<T>({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof UserSchema>) => T;
}) {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/5 space-y-4 rounded-md border bg-background/80 p-4"
      >
        <h1 className="text-center text-2xl font-bold">Zarejestruj się</h1>
        {SignUpFields.map((sfield) => (
          <FormField
            key={sfield.name}
            control={form.control}
            name={sfield.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{sfield.label}</FormLabel>
                <FormControl>
                  <Input {...field} type={sfield.type} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full text-lg font-semibold">
          Zarejestruj się
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
