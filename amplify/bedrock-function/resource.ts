import { defineFunction } from "@aws-amplify/backend";

export const bedrockFunction = defineFunction({
  name: "bedrock-function",
  entry: "./getBedrockResponse.ts",
});
