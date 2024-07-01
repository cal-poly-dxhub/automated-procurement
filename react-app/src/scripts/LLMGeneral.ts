import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import p from "../assets/prompt.json";
import template from "../assets/template.json";

const d_a_a = template["delivery_and_acceptance"];
const gen_prompt = p["gen_prompt"];
const read_prompt = p["read_prompt"];

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
  if (userInput.length < 4 && !isNaN(parseInt(userInput, 10))) {
    const clauses = d_a_a.split("\n\n");
    const clause = clauses[parseInt(userInput, 10)];
    ctx.push({
      role: "user",
      content: [
        {
          type: "text",
          text: gen_prompt.replace("--CLAUSE--", clause.toString()),
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

  try {
    const responses = await getBedrockResponse(ctx);
    const response = {
      role: "assistant",
      content: responses,
    };

    return response;
  } catch (e) {
    console.log(e);
    return {
      role: "assistant",
      content: [
        { type: "text", text: "<Response>An error occurred</Response>" },
      ],
    };
  }
};

const readContract = async (context: any[], userInput: string) => {
  const ctx = context;
  if (ctx.length === 0) {
    const propmt = read_prompt.replace("--CONTRACT--", userInput);
    ctx.push({
      role: "user",
      content: [
        {
          type: "text",
          text: propmt,
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

  try {
    const responses = await getBedrockResponse(ctx);

    const response = {
      role: "assistant",
      content: responses,
    };
    return response;
  } catch (e) {
    console.log(e);
    return {
      role: "assistant",
      content: [
        { type: "text", text: "<Response>An error occurred</Response>" },
      ],
    };
  }
};

const getBedrockResponse = async (
  messages: { role: string; content: { type: string; text: string }[] }[]
) => {
  try {
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 2048,
      messages,
    };

    const command = new InvokeModelCommand({
      contentType: "application/json",
      body: JSON.stringify(payload),
      modelId: model_id,
    });

    const response = await client.send(command);
    console.log(JSON.stringify(response));
    const decodedResponseBody = new TextDecoder().decode(response.body);
    console.log(JSON.stringify(decodedResponseBody));
    const responseBody = JSON.parse(decodedResponseBody);
    const responses = responseBody.content;
    return responses;
  } catch (e) {
    console.log(e);
    return [
      {
        role: "assistant",
        content: [{ type: "text", text: "An error occurred" }],
      },
    ];
  }
};

export { generateContract, getBedrockResponse, readContract };
