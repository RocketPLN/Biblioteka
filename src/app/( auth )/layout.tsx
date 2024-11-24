import type { Metadata } from "next";
import { geistSans, geistMono } from "@/fonts";
import "@/app/globals.css";
import Provider from "@/services/trpc/Provider";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <main className="relative h-screen w-screen overflow-hidden">
            {children}
            <Image
              src="/background.jpeg"
              alt="background"
              width={0}
              height={0}
              sizes="100%"
              className="absolute top-0 -z-10 w-screen object-cover"
            />
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
