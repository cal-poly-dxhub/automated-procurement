import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const model_id = "anthropic.claude-3-sonnet-20240229-v1:0";
const client = new BedrockRuntimeClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const getBedrockResponse = async (
  messages: { role: string; content: { type: string; text: string }[] }[]
) => {
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1024,
    messages,
  };

  const command = new InvokeModelCommand({
    contentType: "application/json",
    body: JSON.stringify(payload),
    modelId: model_id,
  });

  const response = await client.send(command);
  const decodedResponseBody = new TextDecoder().decode(response.body);
  const responseBody = JSON.parse(decodedResponseBody);
  const responses = responseBody.content;

  return responses;
};

export { getBedrockResponse };
