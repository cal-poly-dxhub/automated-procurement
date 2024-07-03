import { useState } from "react";
import gl from "../assets/guidelines.json";
import prompts from "../assets/prompt.json";
import "./SOWGen.css";

import Navbar from "../components/Navbar";
import { generateSOW } from "../scripts/LLMGeneral";

const sow_prompt = prompts["sow_prompt"];
const guidelines = gl["sow"];

const SOWGen = () => {
  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string }[] }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showContext, setShowContext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [context, setContext] = useState<
    {
      role: string;
      content: { type: string; text?: string; image?: any }[];
    }[]
  >([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue === "") {
      return;
    }

    if (loading) {
      alert("Please wait for the response.");
      return;
    }

    const userMessage = {
      role: "user",
      content: [{ type: "text", text: inputValue }],
    };
    setMessages([...messages, userMessage]);
    setInputValue("");

    setLoading(true);
    const response = await generateSOW(context, inputValue);
    if (!response) {
      setLoading(false);
      return;
    }

    const responseText = response.content[0].text
      .split("<Response>")[1]
      .split("</Response>")[0];
    const assistantMessage = {
      role: "assistant",
      content: [{ type: "text", text: responseText }],
    };
    setMessages([...messages, userMessage, assistantMessage]);

    setContext([...context, response]);

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="chat-box-title">Scope of Work Generator Chat</div>
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
