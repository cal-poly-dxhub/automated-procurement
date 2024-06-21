import json
import os
import random

from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_aws import ChatBedrock


def write_to_file(contents: str) -> None:
    filename = f"./assets/contract_{random.randint(1000, 9999)}.txt"
    with open(filename, "w") as file:
        file.write(contents)
        print(f"Contract saved to {filename}")


with open("./assets/short_clause.txt", "r") as file:
    template_contents = file.read()

chain_of_thought_prompt = (
    f"""You are to help a user complete a contract clause. For each task, you should:
1. Restate the task in your own words.
2. Carefully read the provided contract clause template:

{template_contents}

3. Identify the sections that need to be completed or customized based on the user's input.
4. Ask the user one relevant question to begin the process of completing the contract clause.
5. Step-by-step, work with the user to fill in the missing details or customize the relevant sections of the contract clause template.
6. Once all the necessary information has been gathered and the clause has been completed, provide only the final, customized version of the contract clause. Do not include any other information in your response.

If the contract is not complete, respond in JSON format with the following key:
- chain_of_thought_reasoning: Your chain of thought reasoning
- contract_complete: a boolean indicating whether the contract clause has been completed
- question_for_user: The next question to ask the user

If the contract is complete, respond in JSON format with the following key:
- contract_clause: The final, customized version of the contract clause

Your JSON response should use double quotes (\"\"). Your response should also not have any actual newlines, simply use the newline character (\\n) to indicate a newline."""
    + """
User input: {human_input}

Your JSON response:
"""
)

llm = ChatBedrock(
    model_id="anthropic.claude-3-sonnet-20240229-v1:0",
    model_kwargs={"temperature": 0.1},
    system_prompt_with_tools=chain_of_thought_prompt,
)  # type: ignore

memory = ConversationBufferMemory()

conversation = ConversationChain(llm=llm, memory=memory)

starting_prompt = "Please begin the process of completing the contract clause template."
response = conversation.invoke(starting_prompt)
try:
    j = json.loads(response["response"])
    print("AI:", j["question_for_user"])
except Exception:
    print("AI:", response["response"])

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    response = conversation.invoke(user_input)

    if "contract_clause" in response["response"]:
        try:
            j = json.loads(response["response"])
            print("AI:", j["contract_clause"])
        except Exception:
            print(response["response"])
            write_to_file(response["response"])
        break
    else:
        try:
            j = json.loads(response["response"])
            print("AI:", j["question_for_user"])
        except Exception:
            print("AI:", response["response"])

# see contract_4844.txt for first example of generated contract (I formatted it a little bit)
