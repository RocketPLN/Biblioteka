import "@/app/globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {children}
      <Image
        src="/background.jpeg"
        alt="background"
        width={0}
        height={0}
        sizes="100%"
        className="absolute top-0 -z-10 object-cover md:w-screen"
      />
    </main>
  );
}
