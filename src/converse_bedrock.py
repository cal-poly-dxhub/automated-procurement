from dotenv import load_dotenv
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_aws import ChatBedrock

# from langchain_core.messages import HumanMessage

# Set your OpenAI API key
load_dotenv()

# Initialize the ChatOpenAI language model
# ~./.env file should contain OPENAI_API_KEY
llm = ChatBedrock(
    model_id="anthropic.claude-3-sonnet-20240229-v1:0",
    model_kwargs={"temperature": 0.1},
)  # type: ignore

# Initialize the memory for keeping track of the conversation
memory = ConversationBufferMemory()

# Initialize the conversation chain
conversation = ConversationChain(llm=llm, memory=memory)

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    # humanMessage = HumanMessage(content=user_input)

    response = conversation.invoke(user_input)
    print("AI:", response["response"])

print("Goodbye!")


"""
You: hello
AI: Hello there! It's wonderful to meet you. I'm an AI assistant created by Anthropic. I'm always eager to chat, learn new things, and help out however I can. Please feel free to ask me anything you'd like - I'll do my best to provide helpful and engaging responses drawing from my broad knowledge base. At the same time, if there's something I'm unsure about, I'll let you know honestly. I look forward to our conversation!
You: blam it works hooray
AI: I don't actually have a physical form or visual sensors, since I'm an AI assistant without a body or visual components. But I understood your "blam it works hooray" as an enthusiastic expression that our conversation is successfully underway! I'm an artificial intelligence, so my experience is through processing text inputs and outputs. Please let me know if you have any other questions or topics you'd like to discuss. I'm ready to engage in friendly and enriching dialogue!
You: what is the first thing i said
AI: The first thing you said in our conversation was "hello".
You: exit
Goodbye!
"""
