"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { verifyOTP } from "@/services/otp";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/services/trpc/api";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { User } from "next-auth";
import { toast } from "sonner";

function OTP({ otp, user }: { otp: string; user: User }) {
  const [clientOTP, setClientOTP] = useState("");
  const { mutateAsync } = api.User.verfiedUser.useMutation();

  async function Submit() {
    const isValid = await verifyOTP(otp, clientOTP);

    if (isValid) {
      toast.success("Weryfikacja pomyślna!");
    }

    await mutateAsync(user?.id as string);

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
          onChange={(e) => {
            setClientOTP(e);
          }}
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
      <Button onClick={Submit}>Zweryfikuj</Button>
    </div>
  );
}

export default OTP;
