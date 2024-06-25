import json
import os
from typing import Any

import boto3
from langchain_aws import ChatBedrock

script_dir = os.path.dirname(os.path.abspath(__file__))
prompt_path = os.path.join(script_dir, "../assets/prompt.txt")
template_path = os.path.join(script_dir, "../assets/delivery_and_acceptance.txt")

# chat_bedrock = ChatBedrock(
#     model_id="anthropic.claude-3-sonnet-20240229-v1:0",
#     model_kwargs={"temperature": 0.1},
# )  # type: ignore

bedrock = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-west-2",
    # endpoint_url="https://bedrock.us-west-2.amazonaws.com",
)
context: list[str] = []
user_responses: list[str] = []
model_responses: list[str] = []


def list_clause_titles() -> str:
    # lists the clauses in the contract template
    with open(template_path, "r") as f:
        template = f.read()
    clauses = template.split("\n\n")
    titles = [clause.split("\n")[0] for clause in clauses][1:]

    return "\n".join(titles)


def get_clause_text(clause_idx: int) -> str:
    # get the text of the clause at the given index
    with open(template_path, "r") as f:
        template = f.read()
    clauses = template.split("\n\n")
    clause_text = clauses[clause_idx + 1]

    return clause_text


def user_choose_clause() -> int:
    # let the user choose a clause by index
    print("Please choose a clause by entering the clause number:")
    print(list_clause_titles())
    clause_idx = int(input()) - 1

    return clause_idx


def set_preprompt(clause: str) -> str:
    # set the pre-prompt
    with open(prompt_path, "r") as f:
        preprompt = f.read()

    return preprompt.replace("--CLAUSE--", clause)


def extract_response(text: str) -> str:
    # Extract content between <Response> and </Response> tags
    response_contents: list[str] = []
    start_idx = text.find("<Response>")
    while start_idx != -1:
        end_idx = text.find("</Response>", start_idx)
        if end_idx == -1:
            break
        response_contents.append(text[start_idx + 10 : end_idx])
        start_idx = text.find("<Response>", end_idx)

    # Extract content not enclosed in any XML tags only if no <Response> content found
    if not response_contents:
        outside_xml_content: list[str] = []
        prev_end_idx = 0
        while prev_end_idx < len(text):
            start_idx = text.find("<", prev_end_idx)
            if start_idx == -1:
                outside_xml_content.append(text[prev_end_idx:].strip())
                break
            elif start_idx > prev_end_idx:
                outside_xml_content.append(text[prev_end_idx:start_idx].strip())
            end_idx = text.find(">", start_idx)
            prev_end_idx = end_idx + 1
        response_contents = outside_xml_content

    # Combine extracted content
    combined_content = "\n".join(response_contents).strip()
    return combined_content


def claude(
    inp: str,
    context: str,
    temperature: int = 0,
    max_tokens: int = 1024,
    top_p: int = 0,
) -> str:
    prompt = f"{context}\nUser: {inp}\n\nAI:"

    body = json.dumps(
        {
            "prompt": prompt,
            "max_tokens_to_sample": max_tokens,
            "temperature": temperature,
            "top_p": top_p,
            "stop_sequences": ["\n\nHuman:"],
        }
    )

    modelId = "anthropic.claude-3-sonnet-20240229-v1:0"
    accept = "*/*"
    contentType = "application/json"

    # response = chat_bedrock.invoke(
    #     prompt,
    #     # kwargs={
    #     #     "temperature": temperature,
    #     #     "top_p": top_p,
    #     #     "max_tokens_to_sample": max_tokens,
    #     # },
    # )

    # response = response.content

    response: Any = bedrock.invoke_model(
        body=body, modelId=modelId, accept=accept, contentType=contentType
    )

    return response


def update_context(response: str) -> None:
    # update the context
    context.append(response)


def update_user_responses(response: str) -> None:
    # update the user responses
    user_responses.append(response)


def update_model_responses(response: str) -> None:
    # update the model responses
    model_responses.append(response)


def update_all(user: str, model: str) -> None:
    # update the context, user responses, and model responses
    update_context(f"<User>{user}</User>")
    update_context(f"<AI>{model}</AI>")
    update_user_responses(user)
    update_model_responses(model)


def main():
    # list clauses in the template and let the user choose one (by index + 1)
    print(
        "Hello, I am LUCAS, your Legal Understanding and Contract Assistance System. I can help you fill in the missing details in a contract template."
    )
    clause = user_choose_clause()
    clause_text = get_clause_text(clause)
    print(f"Great! Let's work on the following clause:\n{clause_text[0]}")

    while True:
        if len(context) == 0:
            preprompt = set_preprompt(clause_text)
            context.append(preprompt)
            human = ""
        else:
            human = user_responses[-1]

        # prompt model
        model_response = claude(human, context[-1])
        model_response_text = extract_response(model_response)
        print(model_response_text)

        user_response = input()
        update_all(user_response, model_response_text)
        if user_response == "exit":
            break

    j = json.dumps(
        {
            "context": context,
            "user_responses": user_responses,
            "model_responses": model_responses,
        }
    )
    print(j)


if __name__ == "__main__":
    main()
