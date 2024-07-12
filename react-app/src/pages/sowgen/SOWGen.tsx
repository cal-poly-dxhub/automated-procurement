import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SOW from "../../assets/SOW.json";
import "./SOWGen.css";

import Navbar from "../../components/Navbar";

import prompts from "../../assets/prompt.json";
import { getBedrockResponse, getInnerResponse } from "../../scripts/LLMGeneral";
import ALaCarte from "./ALaCarte";
import CurDocument from "./CurDocument";
import SOWChat from "./SOWChat";
const sow_prompt = prompts["sow_prompt"];

const SOWGen = () => {
  const [searchParams] = useSearchParams();
  const userInstitution = searchParams.get("userInstitution");
  const hiringInstitution = searchParams.get("hiringInstitution");
  const scopeOfWork = searchParams.get("scopeOfWork");

  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string }[] }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [commitClause, setCommitClause] = useState<boolean>(false);

  const [context, setContext] = useState<
    {
      role: string;
      content: { type: string; text: string }[];
    }[]
  >([]);

  const handleAddClause = async (clause: { title: string; clause: string }) => {
    // add to prompt later
    // <Document>If you are finished completing the document, please write the finished document here. Otherwise leave this blank.</Document>

    const newPrompt = sow_prompt
      .replace("--CLAUSE--", clause.clause.toString())
      .replace(
        "--INSTITUTION--",
        userInstitution?.toString() ?? "(institution not given)"
      )
      .replace(
        "--HIRED_INSTITUTION--",
        hiringInstitution?.toString() ?? "(institution not given)"
      )
      .replace("--PURPOSE--", scopeOfWork?.toString() ?? "(purpose not given)");

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

  return (
    <div>
      <Navbar />
      <div className="sow-tri-container">
        <ALaCarte
          clauses={SOW}
          currentClause={undefined}
          handleAddClause={handleAddClause}
        />
        <SOWChat
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          setLoading={setLoading}
          context={context}
          setContext={setContext}
        />
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
