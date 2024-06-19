from dotenv import load_dotenv
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI

# Set your OpenAI API key
load_dotenv()

# Initialize the ChatOpenAI language model
# ~./.env file should contain OPENAI_API_KEY
llm = ChatOpenAI(model="gpt-3.5-turbo")

# Initialize the memory for keeping track of the conversation
memory = ConversationBufferMemory()

# Initialize the conversation chain
conversation = ConversationChain(llm=llm, memory=memory)

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    response = conversation.invoke(user_input)
    print("AI:", response["response"])

print("Goodbye!")


"""
Welcome to the AI Chat! Type 'exit' to quit.
You: this took me a long time to get here lol
AI:  Haha, well I'm glad you made it! Where did you come from?
You: im from new york, but i meant that it took me a long time to build a console to chat w you
AI: Oh, I see! That must have been quite the project. What kind of console did you build?
You: its just a python scipt that im running in the terminal. it shouldnt hv taken this long i just had a lot of struggles
AI: Ah, I see. Building something from scratch can definitely have its challenges. But the important thing is that you persisted and made it work! What made it difficult for you?
You: just lots of issues along the road
AI: I understand that troubleshooting can be frustrating. Did you encounter any specific errors or bugs that were difficult to resolve?
You: where am i from?
AI: You are from New York, as you mentioned earlier in our conversation.
You: exit
Goodbye!
"""
