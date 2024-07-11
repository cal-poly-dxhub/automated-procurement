import { useState } from "react";
import SOW from "../../assets/SOW.json";
import "./SOWGen.css";

import Navbar from "../../components/Navbar";

import prompts from "../../assets/prompt.json";
import { getBedrockResponse, getInnerResponse } from "../../scripts/LLMGeneral";
import ALaCarte from "./ALaCarte";
import CurDocument from "./CurDocument";
const sow_prompt = prompts["sow_prompt"];

const SOWGen = () => {
  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string }[] }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showContext, setShowContext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [commitClause, setCommitClause] = useState<boolean>(false);

  const [context, setContext] = useState<
    {
      role: string;
      content: { type: string; text: string }[];
    }[]
  >([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddClause = async (clause: { title: string; clause: string }) => {
    // add to prompt later
    // <Document>If you are finished completing the document, please write the finished document here. Otherwise leave this blank.</Document>

    const newPrompt = sow_prompt.replace(
      "--CLAUSE--",
      clause.clause.toString()
    );

    const newMessage = {
      role: "user",
      content: [{ type: "text", text: `Add clause: ${clause.title}` }],
    };
    const allMessages = [...messages, newMessage];

    setMessages(allMessages);

    const newContext = [
      ...context,
      { role: "user", content: [{ type: "text", text: newPrompt }] },
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
    <div>
      <Navbar />
      <div className="sow-tri-container">
        <ALaCarte
          clauses={SOW}
          currentClause={undefined}
          handleAddClause={handleAddClause}
        />
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
        <CurDocument
          latestClause={{
            title: "Test Clause",
            content: "This is a test clause.",
          }}
          commitClause={commitClause}
          setCommitClause={setCommitClause}
        />
      </div>
    </div>
  );
};

export default SOWGen;
