"use client";

import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import bcrypt from "bcryptjs";

import { generateOTP, sendOtp } from "@/services/otp";
import { api } from "@/services/trpc/api";

import { UserSchema } from "@/lib/zod";
import SignUpForm from "./components/form";
import Otp from "./components/otp";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function SignUp() {
  const session = useSession();

  if (session.data?.user) {
    redirect("/");
  }

  const [sign, setSign] = useState(false);
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = api.User.createUser.useMutation();

  async function onSubmit(data: z.infer<typeof UserSchema>) {
    const otp = await generateOTP();
    try {
      const pwHash = await bcrypt.hash(data.password, 10);

      mutate({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: pwHash,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setOTP(otp);
      setEmail(data.email);
      setPassword(data.password);
      sendOtp(data.email, otp);
      setSign(true);

      toast.success("Zarejestrowano pomyślnie!");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background/80 backdrop-blur-md md:w-1/2">
      {!sign ? (
        <SignUpForm onSubmit={onSubmit} />
      ) : (
        <Otp otp={otp} email={email} password={password} />
      )}
    </div>
  );
}

export default SignUp;
