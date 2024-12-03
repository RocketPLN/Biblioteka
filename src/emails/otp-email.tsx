import { Heading, render, Section, Text } from "@react-email/components";
import Layout from "./layout";

export const OtpEmail = (props: { otp: string }) => {
  const { otp } = props;
  return (
    <Layout>
      <Section className="text-center">
        <Heading as="h1" className="texg-3xl mb-12">
          Kod weryfikacyjny
        </Heading>
      </Section>
      <Section className="text-center">
        <Heading as="h3">Kod weryfikacyjny:</Heading>
        <Text className="rounded-sm border p-2 text-2xl font-semibold">
          {otp.slice(0, 3)}-{otp.slice(3)}
        </Text>
      </Section>
    </Layout>
  );
};

export const emailHtml = async ({ otp }: { otp: string }) => {
  const html = await render(<OtpEmail otp={otp} />);

  return html;
};
