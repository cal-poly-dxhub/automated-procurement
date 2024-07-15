import { useEffect, useState } from "react";
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

  // from params
  const userInstitution = searchParams.get("userInstitution");
  const hiringInstitution = searchParams.get("hiringInstitution");
  const scopeOfWork = searchParams.get("scopeOfWork");

  // for sowgen
  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string }[] }[]
  >([]);
  const [context, setContext] = useState<
    {
      role: string;
      content: { type: string; text: string }[];
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  // for curdocument
  const [accepted, setAccepted] = useState<boolean>(false);
  const [currentClause, setCurrentClause] = useState<{
    title: string;
    clause: string;
  }>({
    title: "",
    clause: "",
  });
  const [document, setDocument] = useState<
    | {
        title: string;
        content: string;
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
    const m = getInnerResponse(r);
    const messageR = m.response;
    const messageC = m.clause;

    if (messageC) {
      alert("(SOWGEN) Add clause: " + messageC);
    }

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

  // if accepted add to document
  useEffect(() => {
    if (!accepted) {
      return;
    }

    alert("Accepted");

    // add latest clause to document
    const newDocument = [
      ...document,
      {
        title: "title placeholder",
        content: currentClause.clause,
      },
    ];
    setDocument(newDocument);

    setAccepted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted]);

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
          setAccepted={setAccepted}
          currentClause={currentClause}
          setCurrentClause={setCurrentClause}
        />
        <CurDocument document={document} setDocument={setDocument} />
      </div>
    </div>
  );
};

export default SOWGen;
