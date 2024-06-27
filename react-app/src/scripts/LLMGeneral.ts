import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import p from "../assets/prompt.json";
import template from "../assets/template.json";

const d_a_a = template["delivery_and_acceptance"];
const prompt = p["prompt"];

const model_id = "anthropic.claude-3-sonnet-20240229-v1:0";
const client = new BedrockRuntimeClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const generateContract = async (context: any[], userInput: string) => {
  const ctx = context;
  if (!isNaN(parseInt(userInput, 10))) {
    const clauses = d_a_a.split("\n\n");
    const clause = clauses[parseInt(userInput, 10)];
    ctx.push({
      role: "user",
      content: [
        {
          type: "text",
          text: prompt.replace("--CLAUSE--", clause.toString()),
        },
      ],
    });
  } else {
    ctx.push({
      role: "user",
      content: [
        {
          type: "text",
          text: userInput,
        },
      ],
    });
  }

  const responses = await getBedrockResponse(ctx);
  const response = {
    role: "assistant",
    content: responses,
  };
  return response;
};

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

export { generateContract, getBedrockResponse };
