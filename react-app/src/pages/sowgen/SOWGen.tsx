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
  const supplier = searchParams.get("supplier");
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
        // <Summary>This will contain a brief summary of the information in the finished clause. Only use this tag when you are ready to present the final clause to the user.</Summary>
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
      .replace("--SUPPLIER--", supplier?.toString() ?? "(supplier not given)")
      .replace("--PURPOSE--", scopeOfWork?.toString() ?? "(purpose not given)")
      .replace(
        "--EXISTING_CLAUSES--",
        document.map((doc) => doc.content).join(" ")
      );

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
          document={document}
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
