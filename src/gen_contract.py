import json
import random

from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_aws import ChatBedrock


def write_to_file(contents: str) -> None:
    filename = (
        f"./assets/contract_{random.randint(1000, 9999)}.txt"  # timestamo instead
    )
    with open(filename, "w") as file:
        file.write(contents)
        print(f"Contract saved to {filename}")


with open("./assets/completion_of_deliverables.txt", "r") as file:
    template_contents = file.read()

chain_of_thought_prompt = (
    f"""You are to help a user complete a contract clause in a detailed and comprehensive manner. For each task, you should:
1. Restate the task in your own words.
2. Carefully read the provided contract clause template. Note that the template contains placeholders indicated by brackets ([]) that need to be filled in or customized based on the user's input. The template is a guideline, if you feel that it should be altered you may do so. The template is as follows:

{template_contents}

3. Identify the sections that need to be completed or customized based on the user's input.
(Ask the user a question about a line item in the template to determine its relevancy ... )
4. Ask the user ONE relevant and specific question to gather the necessary information for completing or customizing each section of the contract clause. Your questions should aim to elicit detailed and comprehensive responses from the user.
5. Step-by-step, work with the user to fill in the missing details or customize the relevant sections of the contract clause template. Encourage the user to provide as much detail and clarity as possible. Note that you may alter the user's response to add detail, fix punctuation, and fix capitalization.
6. Once all the necessary information has been gathered and the clause has been completed, provide only the final, customized version of the contract clause. The completed clause should be detailed, comprehensive, and address all relevant aspects of the contract.

If the contract is not complete, respond in JSON format with the following keys:
- chain_of_thought_reasoning: Your chain of thought reasoning
- contract_complete: a boolean indicating whether the contract clause has been completed
- question_for_user: The next specific and detailed question to ask the user

If the contract is complete, respond in JSON format with the following key:
- contract_clause: The final, detailed, and comprehensive customized version of the contract clause

Your JSON response should use double quotes (\"\"). Your response should also not have any actual newlines, simply use the newline character (\\n) to indicate a newline."""
    + """The user has provided the following information:

{human_input}

Please begin the process of completing the contract clause template in a detailed and comprehensive manner.
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
    j = json.loads(response["response"].strip("```json").strip("```"))
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
            j = json.loads(response["response"].strip("```json").strip("```"))
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
