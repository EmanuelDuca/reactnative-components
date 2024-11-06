import {
  Button,
  Container,
  Head,
  Section,
  Text,
} from "@react-email/components";
import {
  EmailLayout,
  EmailLayoutBody,
  EmailLayoutContent,
  EmailLayoutHeader,
  EmailLayoutInfoBox,
} from "./automated-email-layout";
import { KeyholeLogo } from "../icons/keyholeLogo";

const WelcomeEmail = () => (
  <EmailLayout>
    <Head>
      <title>Email Layout Title</title>
    </Head>

    <EmailLayoutBody>
      <EmailLayoutHeader>
        <KeyholeLogo />
      </EmailLayoutHeader>
      <EmailLayoutContent>
        <Text className="text-2xl font-bold italic ">RESET PASSWORD</Text>
        <Text>
          We recived a request to reset your password for your Keyhole
          management portal account.
        </Text>
        <Text>To create a new password, plsease use the button bellow:</Text>
        <Button className="bg-brand-600 p-2" href="https://example.com">
          Get Started
        </Button>
        <Text>
          If you did not request a password reset, plese ignore this email. YOur
          account will remain secure.
        </Text>
      </EmailLayoutContent>
      <EmailLayoutInfoBox>
        <Text>
          This is an automated email. If you need help, please contact support
          here instead of replying to this email.
        </Text>
        <Text>© 2024 - Udsendt af Keyhole ApS</Text>
      </EmailLayoutInfoBox>
    </EmailLayoutBody>

    <Section className="bg-neutral-200">
      <Text>If you have any questions, feel free to contact support.</Text>
    </Section>
  </EmailLayout>
);

export default WelcomeEmail;
