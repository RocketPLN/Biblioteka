"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "./api";
import { httpBatchLink } from "@trpc/client";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https//:${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
