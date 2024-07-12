import { useState } from "react";
import { getBedrockResponse, getInnerResponse } from "../../scripts/LLMGeneral";
import "./SOWChat.css";

const SOWGen = ({
  messages,
  setMessages,
  loading,
  setLoading,
  context,
  setContext,
}: {
  messages: { role: string; content: { type: string; text: string }[] }[];
  setMessages: (
    messages: { role: string; content: { type: string; text: string }[] }[]
  ) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  context: { role: string; content: { type: string; text: string }[] }[];
  setContext: (
    context: { role: string; content: { type: string; text: string }[] }[]
  ) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showContext, setShowContext] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    const ui = inputValue;
    setInputValue("");

    const newMessage = {
      role: "user",
      content: [{ type: "text", text: ui }],
    };

    const allMessages = [...messages, newMessage];
    setMessages(allMessages);

    const newContext = [
      ...context,
      { role: "user", content: [{ type: "text", text: ui }] },
    ];
    setContext(newContext);
    setLoading(true);
    const r = await getBedrockResponse(newContext);
    const messageR = getInnerResponse(r);
    setMessages([
      ...allMessages,
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: messageR,
          },
        ],
      },
    ]);
    newContext.push({ role: "assistant", content: r });
    setContext(newContext);
    setLoading(false);
  };

  return (
    <div className="sow-container">
      <div className="chat-box-title">
        <h2>Scope of Work Generator Chat</h2>
      </div>
      <div className="contract-gen">
        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user" : "assistant"
              }`}
            >
              {message?.content[0]?.text}
            </div>
          ))}
          {loading && <div className="message assistant">Loading...</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage}>Send</button>
          <button onClick={() => setMessages([])}>Clear</button>
          <button onClick={() => setShowContext(!showContext)}>
            {showContext ? "Hide" : "Show"} Context
          </button>
        </div>
      </div>
      {showContext && <div>{JSON.stringify(context)}</div>}
    </div>
  );
};

export default SOWGen;
