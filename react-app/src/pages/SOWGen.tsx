import { useState } from "react";
import SOW from "../assets/SOW.json";
import "./SOWGen.css";

import DocumentSidebar from "../components/DocumentSidebar";
import Navbar from "../components/Navbar";

const SOWGen = () => {
  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string }[] }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showContext, setShowContext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentDocument, setCurrentDocument] = useState<
    {
      title: string;
      content: string;
    }[]
  >([]);
  const [currentClause, setCurrentClause] = useState<number | undefined>(
    undefined
  );

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
    // add to prompt later
    // <Document>If you are finished completing the document, please write the finished document here. Otherwise leave this blank.</Document>
  };

  const handleAddClause = (clause: { title: string; clause: string }) => {
    const initialMessage = {
      role: "user",
      content: [{ type: "text", text: `Add clause: ${clause.title}` }],
    };
    setMessages([...messages, initialMessage]);
    setInputValue(`Provide more details about the clause "${clause.title}".`);
    setCurrentClause(currentDocument.length);
  };

  const handleRemoveClause = (index: number) => {
    const newDocument = currentDocument.filter((_, i) => i !== index);
    setCurrentDocument(newDocument);
  };

  return (
    <div>
      <Navbar />
      <DocumentSidebar
        clauses={SOW}
        currentClause={currentClause}
        setCurrentClause={setCurrentClause}
        currentDocument={currentDocument}
        handleAddClause={handleAddClause}
        handleRemoveClause={handleRemoveClause}
      />
      <div className="sow-container">
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
    </div>
  );
};

export default SOWGen;
