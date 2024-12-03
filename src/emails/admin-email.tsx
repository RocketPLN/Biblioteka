import { Button, render, Section, Text } from "@react-email/components";
import Layout from "./layout";

export function Email({ text }: { text: string }) {
  return (
    <Layout>
      <Section className="text-center">
        <Text className="texg-3xl mb-12">{text}</Text>
      </Section>
      <Section className="text-center">
        <Button
          href="localhost:3000"
          className="rounded-sm border bg-secondary p-2 text-xl text-foreground"
        >
          Zobacz
        </Button>
      </Section>
    </Layout>
  );
}

export async function EmailHtml({ text }: { text: string }) {
  const html = render(<Email text={text} />);

  return html;
}
