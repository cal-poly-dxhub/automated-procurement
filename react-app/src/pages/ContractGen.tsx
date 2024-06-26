import { useRef, useState } from "react";
import "./ContractGen.css";

import Navbar from "../components/Navbar";
import { getBedrockResponse } from "../scripts/LLMGeneral";

const ContractGen = () => {
  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string }[] }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  const user_responses = useRef<string[]>([]);
  const llm_responses = useRef<string[]>([]);
  const context = useRef<string[]>([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const prevMessages = [...messages];
      setMessages([
        ...prevMessages,
        { content: [{ type: "text", text: inputValue }], role: "user" },
      ]);
      setInputValue("");

      const response = await getBedrockResponse([
        ...prevMessages,
        { content: [{ type: "text", text: inputValue }], role: "user" },
      ]);

      setMessages([
        ...prevMessages,
        { content: [{ type: "text", text: inputValue }], role: "user" },
        { content: response, role: "llm" },
      ]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contract-gen">
        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === "user" ? "user" : "llm"}`}
            >
              {message.content[0].text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
          <button onClick={() => setMessages([])}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default ContractGen;
