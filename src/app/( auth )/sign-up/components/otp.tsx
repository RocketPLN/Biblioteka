"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

import { verifyOTP } from "@/services/otp";
import { api } from "@/services/trpc/api";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";

function Otp({
  otp,
  email,
  password,
}: {
  otp: string;
  email: string;
  password: string;
}) {
  const [clientOTP, setClientOTP] = useState("");

  const user = api.User.getUsers
    .useQuery()
    .data?.find((u) => u.email === email);

  const { mutateAsync } = api.User.updateUser.useMutation();

  async function submit() {
    const isValid = await verifyOTP(otp, clientOTP);

    if (isValid) {
      toast.success("Weryfikacja pomyślna!");
    }

    mutateAsync({
      id: user?.id as string,
      verify: true,
      email: email,
      password: user?.password as string,
      firstName: user?.firstName as string,
      lastName: user?.lastName as string,
    });

    signIn("credentials", { email: email, password: password });

    redirect("/");
  }
  return (
    <div className="flex w-2/5 flex-col gap-4 rounded-md border bg-background/80 p-4">
      <h1 className="text-center text-2xl font-bold">Sprawdź swójego maila</h1>
      <p className="text-wrap text-center text-sm">
        Otrzymasz wiadomość e-mail z kodem weryfikacyjnym. Wpisz go tutaj.
      </p>
      <div className="flex w-full justify-center p-4">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          className="text-xl"
          value={clientOTP}
          onChange={(e) => setClientOTP(e)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button onClick={submit}>Zweryfikuj</Button>
    </div>
  );
}

export default Otp;
