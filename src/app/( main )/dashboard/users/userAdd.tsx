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
import { useRouter } from "next/navigation";
import { api } from "@/services/trpc/api";
import { toast } from "sonner";
import { Send } from "@/lib/email";

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
];

function UserAdd() {
  const router = useRouter();
  const { mutateAsync: createUser } = api.User.createUser.useMutation();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "zse1234;",
    },
  });

  async function onSubmit(data: z.infer<typeof UserSchema>) {
    await createUser({ ...data });
    toast.success("Użytkownik " + data.firstName + " został utworzony");

    await Send({
      to: data.email,
      subject: "Utworzono ci konto",
      html: `<h1>Administrator utworzył ci konto</h1><p><a href="localhost:3000">Zobacz</a></p>`,
    });

    router.prefetch("/dashboard/users");
    router.push("/dashboard/users");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
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
          Utwórz konto
        </Button>
      </form>
    </Form>
  );
}

export default UserAdd;
