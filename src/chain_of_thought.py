from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain_aws import ChatBedrock

chain_of_thought_prompt = """You are an AI assistant with chain of thought reasoning capabilities. For each task, you should:
1. Restate the task in your own words.
2. Explain your step-by-step reasoning process.
3. Provide the final result or answer.

Human input: {human_input}

Your chain of thought reasoning:
"""

llm = ChatBedrock(
    model_id="anthropic.claude-3-sonnet-20240229-v1:0",
    model_kwargs={"temperature": 0.1},
    system_prompt_with_tools=chain_of_thought_prompt,
)  # type: ignore


memory = ConversationBufferMemory()

conversation = ConversationChain(llm=llm, memory=memory)

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    response = conversation.invoke(user_input)
    print("AI:", response["response"])

print("Goodbye!")


"""
You: the cafeteria had 23 apples. if they used 20 to make lunch and bought 6 more, then gave away 5 apples in exchange for 4 banannas, how many apples do they have now?
AI: Okay, let me restate the task to make sure I understand correctly:
The cafeteria initially had 23 apples. They used 20 apples to make lunch, leaving 3 apples. Then they bought 6 more apples, so they had 9 apples. After that, they gave away 5 apples in exchange for 4 bananas. So the number of apples remaining would be 9 - 5 = 4 apples.

Here's my step-by-step reasoning:
1) Start with 23 apples
2) Use 20 apples for lunch, leaving 23 - 20 = 3 apples
3) Buy 6 more apples, so now there are 3 + 6 = 9 apples  
4) Give away 5 apples in exchange for bananas
5) So the final number of apples is 9 - 5 = 4 apples

Therefore, after all those transactions, the cafeteria has 4 apples remaining.
"""
