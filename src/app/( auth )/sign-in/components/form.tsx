"use client";

import { useForm } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

export const UserSignIn = z.object({
  email: z.string(),
  password: z.string(),
});

const SignInFields: {
  name: keyof z.infer<typeof UserSignIn>;
  label: string;
  type: HTMLInputTypeAttribute;
}[] = [
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

function SignInForm<T>({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof UserSignIn>) => T;
}) {
  const form = useForm<z.infer<typeof UserSignIn>>({
    resolver: zodResolver(UserSignIn),
    defaultValues: {
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
        <h1 className="text-center text-2xl font-bold">Zaloguj się</h1>
        {SignInFields.map((sfield) => (
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
          Zaloguj się
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
