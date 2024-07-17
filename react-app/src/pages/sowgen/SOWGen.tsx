import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SOW from "../../assets/SOW.json";
import "./SOWGen.css";

import Navbar from "../../components/Navbar";

import prompts from "../../assets/prompt.json";
import { getBedrockResponse } from "../../scripts/LLMGeneral";
import ALaCarte from "./ALaCarte";
import CurDocument from "./CurDocument";
import SOWChat from "./SOWChat";
const sow_prompt = prompts["sow_prompt"];

const SOWGen = () => {
  const [searchParams] = useSearchParams();

  // from params
  const documentTitle = searchParams.get("documentTitle");
  const userInstitution = searchParams.get("userInstitution");
  const hiringInstitution = searchParams.get("hiringInstitution");
  const scopeOfWork = searchParams.get("scopeOfWork");

  // for sowgen
  const [SOWTemplates, setSOWTemplates] = useState<
    {
      title: string;
      clause: string;
    }[]
  >(SOW);
  const [loading, setLoading] = useState<boolean>(false);
  const [contexts, setContexts] = useState<
    {
      title: string;
      context: {
        role: string;
        content: { type: string; text: string }[];
      }[];
    }[]
  >([]);

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
    setCurrentClause(clause);
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

    const newContext = [
      ...contexts,
      {
        title: clause.title,
        context: [
          { role: "user", content: [{ type: "text", text: newPrompt }] },
        ],
      },
    ];

    setContexts(newContext);

    setLoading(true);
    const r = await getBedrockResponse(
      newContext.find((c) => c.title === clause.title)?.context ?? []
    );

    newContext
      .find((c) => c.title === clause.title)
      ?.context.push({ role: "assistant", content: r });
    setContexts(newContext);
    setLoading(false);
  };

  // if accepted add to document
  useEffect(() => {
    if (!accepted) {
      return;
    }

    const existingDocumentIndex = document.findIndex(
      (doc) => doc.title === currentClause.title
    );
    if (existingDocumentIndex !== -1) {
      const newDocument = [...document];
      newDocument[existingDocumentIndex] = {
        title: currentClause.title,
        content: currentClause.clause,
      };
      setDocument(newDocument);
    } else {
      const newDocument = [
        ...document,
        {
          title: currentClause.title,
          content: currentClause.clause,
        },
      ];
      setDocument(newDocument);
    }

    setAccepted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted]);

  return (
    <div>
      <Navbar />
      <div className="sow-tri-container">
        <ALaCarte
          templates={SOWTemplates}
          setTemplates={setSOWTemplates}
          currentClause={currentClause}
          handleAddClause={handleAddClause}
        />
        <SOWChat
          loading={loading}
          setLoading={setLoading}
          contexts={contexts}
          setContexts={setContexts}
          setAccepted={setAccepted}
          currentClause={currentClause}
          setCurrentClause={setCurrentClause}
        />
        <CurDocument
          document={document}
          setDocument={setDocument}
          documentTitle={documentTitle}
          setCurrentClause={setCurrentClause}
        />
      </div>
    </div>
  );
};

export default SOWGen;
