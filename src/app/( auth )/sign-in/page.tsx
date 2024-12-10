"use client";

import { z } from "zod";
import { signIn, useSession } from "next-auth/react";

import { api } from "@/services/trpc/api";
import SignInForm, { UserSignIn } from "./components/form";
import { toast } from "sonner";
import { redirect } from "next/navigation";

function SignIn() {
  const session = useSession();

  if (session.data?.user) {
    redirect("/");
  }

  const { data: users } = api.User.getUsers.useQuery();

  async function onSubmit(data: z.infer<typeof UserSignIn>) {
    if (!users?.find((u) => u.email === data.email)) {
      toast.error("Nie istnieje taki użytkownik");
      return;
    }
    try{
    await signIn("credentials", { email: data.email, password: data.password });}
    catch(e) {
      toast.error("Błędne dane")
    } finally{
      toast.success("Zalogowano pomyślnie!");
      redirect("/");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background/80 backdrop-blur-md md:w-1/2">
      <SignInForm onSubmit={onSubmit} />
    </div>
  );
}

export default SignIn;
