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

function SignUp() {
  const [sign, setSign] = useState(false);
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync } = api.User.createUser.useMutation();

  async function onSubmit(data: z.infer<typeof UserSchema>) {
    const otp = await generateOTP();
    try {
      const pwHash = await bcrypt.hash(data.password, 10);

      await mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: pwHash,
      });
    } catch (error) {
      toast.error(error as string);
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
    <div className="flex h-screen w-1/2 items-center justify-center bg-background/80 backdrop-blur-md">
      {!sign ? (
        <SignUpForm onSubmit={onSubmit} />
      ) : (
        <Otp otp={otp} email={email} password={password} />
      )}
    </div>
  );
}

export default SignUp;
