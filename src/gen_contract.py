from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_aws import ChatBedrock

# ~./.env file should contain OPENAI_API_KEY
llm = ChatBedrock(
    model_id="anthropic.claude-3-sonnet-20240229-v1:0",
    model_kwargs={"temperature": 0.1},
)  # type: ignore

memory = ConversationBufferMemory()

conversation = ConversationChain(llm=llm, memory=memory)

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    response = conversation.invoke(user_input)
    print("AI:", response["response"])
