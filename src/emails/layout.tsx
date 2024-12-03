import { Container, Tailwind } from "@react-email/components";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              background: "hsl(0 0% 100%)",
              foreground: "hsl(20 14.3% 4.1%)",
              primary: {
                DEFAULT: "hsl(47.9 95.8% 53.1%)",
                foreground: "hsl(26 83.3% 14.1%)",
              },
              secondary: {
                DEFAULT: "hsl(60 4.8% 95.9%)",
                foreground: "hsl(v24 9.8% 10%)",
              },
              destructive: {
                DEFAULT: "hsl(0 84.2% 60.2%)",
                foreground: "hsl(60 9.1% 97.8%)",
              },
              border: "hsl(20 5.9% 90%)",
              input: "hsl(20 5.9% 90%)",
              ring: "hsl(20 14.3% 4.1%)",
            },
            borderRadius: {
              lg: "0.75rem",
              md: "calc(0.75rem - 2px)",
              sm: "calc(0.75rem - 4px)",
            },
          },
        },
      }}
    >
      <Container className="font-[Helvetica]">{children}</Container>
    </Tailwind>
  );
};

export default Layout;
