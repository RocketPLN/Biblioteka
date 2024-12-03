import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import OTP from "./otp";
import { generateOTP, sendOtp } from "@/services/otp";

const Page = async () => {
  const session = await auth();
  const otp = await generateOTP();

  if (!session?.user || session.user.verified) {
    redirect("/");
  }

  await sendOtp(session.user.email as string, otp);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background/80 backdrop-blur-md md:w-1/2">
      <OTP otp={otp} user={session.user} />
    </div>
  );
};

export default Page;
