import { useState } from "react";
import {
  getBedrockResponse,
  getCaluseTags,
  getResponseTags,
} from "../../scripts/LLMGeneral";
import "./SOWChat.css";

const SOWGen = ({
  loading,
  setLoading,
  contexts,
  setContexts,
  setAccepted,
  currentClause,
  setCurrentClause,
  document,
  title = "Scope of Work Generator",
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  contexts: {
    title: string;
    context: { role: string; content: { type: string; text: string }[] }[];
  }[];
  setContexts: (
    contexts: {
      title: string;
      context: { role: string; content: { type: string; text: string }[] }[];
    }[]
  ) => void;
  setAccepted: (accepted: boolean) => void;
  currentClause: { title: string; clause: string };
  setCurrentClause: (currentClause: { title: string; clause: string }) => void;
  document: { title: string; content: string }[];
  title?: string;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [clausePopup, setClausePopup] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    const ui = inputValue;
    setInputValue("");

    const oldContext = contexts.find(
      (c) => c.title === currentClause.title
    ) ?? {
      title: currentClause.title,
      context: [],
    };
    const newContext = [
      ...oldContext.context,
      { role: "user", content: [{ type: "text", text: ui }] },
    ];
    const newContexts = [
      ...contexts.filter((c) => c.title !== currentClause.title),
      { title: currentClause.title, context: newContext },
    ];

    setContexts(newContexts);

    setLoading(true);
    const r = await getBedrockResponse(newContext);
    const finishedClause = getCaluseTags(r);

    if (finishedClause) {
      setCurrentClause({ title: currentClause.title, clause: finishedClause });
      setClausePopup(true);
    }

    newContext.push({ role: "assistant", content: r });
    setContexts(newContexts);

    setLoading(false);
  };

  const getMessages = () => {
    const currentContext = contexts.find(
      (c) => c.title === currentClause.title
    )?.context;

    if (!currentContext) {
      return [];
    }

    return currentContext.map((message, index) => {
      if (message.role === "assistant") {
        if (getCaluseTags(message.content) !== "") {
          return (
            <div key={index} className="message assistant">
              {getCaluseTags(message.content)}
            </div>
          );
        }

        return (
          <div key={index} className="message assistant">
            {getResponseTags(message.content)}
          </div>
        );
      }

      if (
        message.role === "user" &&
        message.content[0].text.includes(
          "You are LUCAS, a procurement manager assistant specialized in creating scope of work"
        )
      ) {
        return (
          <div key={index} className="message user">
            Start working on {currentClause.title}
          </div>
        );
      }

      return (
        <div
          key={index}
          className={`message ${
            message.role === "user" ? "user" : "assistant"
          }`}
        >
          {message?.content[0]?.text}
        </div>
      );
    });
  };

  return (
    <div className="sow-container">
      <div className="chat-box-title">
        <h2>{title}</h2>
      </div>
      <div className="contract-gen">
        <div className="message-container">
          {getMessages()}
          {loading && <div className="message assistant">Loading...</div>}
          {clausePopup && (
            <div className="clause-popup-background">
              <div className="clause-popup">
                <div className="clause">
                  <h3 className="clause-title">{currentClause.title}</h3>
                  <p className="clause-content">{currentClause.clause}</p>
                </div>
                <div className="clause-buttons">
                  <button
                    className="button"
                    onClick={() => {
                      setAccepted(true);
                      setClausePopup(false);
                    }}
                  >
                    Accept Clause
                  </button>
                  <button
                    className="button"
                    onClick={() => setClausePopup(false)}
                  >
                    Continue Editing
                  </button>
                </div>
              </div>
            </div>
          )}
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
          <button
            onClick={() => {
              console.log(contexts);
            }}
          >
            Log Context
          </button>
        </div>
      </div>
    </div>
  );
};

export default SOWGen;
