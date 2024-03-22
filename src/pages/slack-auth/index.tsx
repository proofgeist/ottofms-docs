import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  ActionIcon,
  Alert,
  Anchor,
  Center,
  CopyButton,
  Image,
  MantineProvider,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  createTheme,
} from "@mantine/core";
import { IconCopy, IconExternalLink } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import ottofmsLite from "../../../public/img/OttoFMS/ottofms-lite.svg";
import NextImage from "next/image";

async function getTokens(code: string) {
  const url = `https://slack.com/api/oauth.v2.access`;

  const details = {
    code: code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
  };

  const formBody = [];
  for (const [property, value] of Object.entries(details)) {
    if (!value) {
      continue;
    }
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(value);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  const fetchBody = formBody.join("&");
  try {
    const result = await fetch(url, {
      method: "POST",
      body: fetchBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const json = await result.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context?.query.code;
  if (!code) {
    return {
      props: {
        ok: false,
        error: "No code provided",
      },
    };
  }

  const token = await getTokens(code as string);

  return {
    props: { token },
  };
};

export const theme = createTheme({
  colors: {
    brand: [
      "#dcf8ff",
      "#b2e4ff",
      "#84d0f9",
      "#56bdf5",
      "#2caaf2",
      "#1791d8",
      "#0a71a9",
      "#00507a",
      "#00304b",
      "#00111e",
    ],
  },
  primaryColor: "brand",
});

export default function Page({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  token = token || { ok: false, error: "No token found." };
  return (
    <MantineProvider theme={theme}>
      <Center w="100%" h="100vh" bg="var(--mantine-color-gray-2)">
        <Paper w="70%" maw={"700px"} p="lg" withBorder shadow="md" py="xl">
          <Stack align="center" w="100%" gap="lg">
            <Image
              component={NextImage}
              src={ottofmsLite}
              alt="OttoFMS Logo"
              h={"100px"}
              w={"280px"}
            />
            <Title style={{ textAlign: "center" }}>
              Slack Notification Webhook
            </Title>
            {token && token.ok ? (
              <>
                <WebhookInput url={token?.incoming_webhook.url}></WebhookInput>
                <Text>
                  <Anchor href="https://docs.ottofms.com/guides/notifications#slack">
                    Learn more{" "}
                    <IconExternalLink style={{ verticalAlign: "sub" }} />
                  </Anchor>{" "}
                  about how to integrate OttoFMS with Slack.
                </Text>
              </>
            ) : (
              <Alert color="red" title="Authentication Failed!" miw="60%">
                <Text>
                  {token?.error ? token.error : "Unable to get authentication"}
                </Text>
              </Alert>
            )}
          </Stack>
        </Paper>
      </Center>
    </MantineProvider>
  );
}

function WebhookInput({ url }: { url: string }) {
  return (
    <TextInput
      label="OttoFMS Wehbook URL"
      readOnly
      size="lg"
      rightSection={
        <CopyButton value={url}>
          {({ copied, copy }) => {
            return (
              <Tooltip label={copied ? "Copied" : "Copy Url"}>
                <ActionIcon variant="subtle" onClick={() => copy()}>
                  <IconCopy />
                </ActionIcon>
              </Tooltip>
            );
          }}
        </CopyButton>
      }
      value={url}
      description="Copy and paste this into your OttoDeploy settings, or into your Deployment
      JSON Payload"
    ></TextInput>
  );
}
