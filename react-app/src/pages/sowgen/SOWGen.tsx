import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SOWGen.css";

import Navbar from "../../components/Navbar";

import {
  getBedrockResponse,
  getIncrementalContext,
} from "../../scripts/LLMGeneral";
import ALaCarte from "./ALaCarte";
import CurDocument from "./CurDocument";
import SOWChat from "./SOWChat";

import prompts from "../../assets/prompt.json";
import templates from "../../assets/SOWCategories.json";
const sow_prompt = prompts["sow_prompt"];
const ScopeOfWork = templates.Clauses.find(
  (clause) => clause.category === "All"
)?.clauses.find((clause) => clause.title === "Scope of Work");

const SOWGen = () => {
  const [searchParams] = useSearchParams();

  // from params
  const category = searchParams.get("category");
  const userInstitution = searchParams.get("userInstitution");
  const supplier = searchParams.get("supplier");
  const documentPurpose = searchParams.get("documentPurpose");

  // for sowchat
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
    summary: string;
  }>({
    title: "",
    clause: "",
    summary: "",
  });
  const clauseRef = useRef<string>("");
  const [document, setDocument] = useState<
    {
      title: string;
      content: string;
      summary: string;
    }[]
  >([]);

  const handleAddClause = async (clause: {
    title: string;
    clause: string;
    summary: string;
  }) => {
    setCurrentClause(clause);
    const incrementalContext = getIncrementalContext(document);

    const newPrompt = sow_prompt
      .replaceAll("--CLAUSE--", clause.clause.toString())
      .replaceAll(
        "--INSTITUTION--",
        userInstitution?.toString() ?? "(institution not given)"
      )
      .replaceAll(
        "--SUPPLIER--",
        supplier?.toString() ?? "(supplier not given)"
      )
      .replaceAll(
        "--PURPOSE--",
        category?.toString() + ", " + documentPurpose?.toString()
      )
      // replace --SCOPE-- with the content of the Scope of Work clause
      .replaceAll(
        "--SCOPE--",
        document
          .find((doc) => doc.title === "Scope of Work")
          ?.content.toString() ?? "" // TODO: ????????????? hah?
      )
      .concat(
        "<Summary>This will contain a summary of the finished clause if you complete the clause. You only have 128 tokens to summarize the clause. Do not go over this token limit under any circumstance.</Summary>"
      )
      .concat(incrementalContext);

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
        summary: currentClause.summary,
      };
      setDocument(newDocument);
    } else {
      const newDocument = [
        ...document,
        {
          title: currentClause.title,
          content: currentClause.clause,
          summary: currentClause.summary,
        },
      ];
      setDocument(newDocument);
    }

    setAccepted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted]);

  // auto select Scope of Work clause
  useEffect(() => {
    if (clauseRef.current === "" && ScopeOfWork) {
      clauseRef.current = ScopeOfWork.title;
      handleAddClause({
        ...ScopeOfWork,
        summary: "",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="sow-tri-container">
        <ALaCarte
          currentCategory="Technology"
          currentClause={currentClause}
          handleAddClause={handleAddClause}
          document={document}
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
          documentTitle={category + " Scope of Work"}
          setCurrentClause={setCurrentClause}
        />
      </div>
    </div>
  );
};

export default SOWGen;
