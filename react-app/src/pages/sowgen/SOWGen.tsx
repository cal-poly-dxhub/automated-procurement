import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
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

const DEBUG = false;

const SOWGen = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // from finish doc
  const sowgenContext: {
    contexts: {
      title: string;
      context: { role: string; content: { type: string; text: string }[] }[];
    }[];
    category: string;
    userInstitution: string;
    supplier: string;
    documentPurpose: string;
    document: { title: string; content: string; summary: string }[];
    currentClause: { title: string; clause: string; summary: string };
    documentTitle: string;
  } = location?.state?.sowgenContext;

  // from params
  const category = sowgenContext?.category ?? searchParams.get("category");
  const userInstitution =
    sowgenContext?.category ?? searchParams.get("userInstitution");
  const supplier = sowgenContext?.category ?? searchParams.get("supplier");
  const documentPurpose =
    sowgenContext?.category ?? searchParams.get("documentPurpose");

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
  >(sowgenContext?.contexts ?? []);

  // for curdocument
  const [accepted, setAccepted] = useState<boolean>(false);
  const [currentClause, setCurrentClause] = useState<{
    title: string;
    clause: string;
    summary: string;
  }>(
    sowgenContext?.currentClause ?? {
      title: "",
      clause: "",
      summary: "",
    }
  );
  const clauseRef = useRef<string>("");
  const [document, setDocument] = useState<
    {
      title: string;
      content: string;
      summary: string;
    }[]
  >(sowgenContext?.document ?? []);

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
    if (clauseRef.current === "" && ScopeOfWork && contexts.length === 0) {
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
          currentCategory={category ?? ""}
          currentClause={currentClause}
          handleAddClause={handleAddClause}
          document={document}
          debug={DEBUG}
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
          debug={DEBUG}
        />
        <CurDocument
          document={document}
          setDocument={setDocument}
          documentTitle={category + " Scope of Work"}
          sowgenContext={{
            contexts,
            category,
            userInstitution,
            supplier,
            documentPurpose,
            document,
            currentClause,
            documentTitle: category + " Scope of Work",
          }}
          setCurrentClause={setCurrentClause}
          debug={DEBUG}
        />
      </div>
    </div>
  );
};

export default SOWGen;
