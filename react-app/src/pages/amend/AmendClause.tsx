import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SOWChat from "../sowgen/SOWChat";
import "./AmendClause.css";
import AmendInput from "./AmendInput";

import j from "../../assets/prompt.json";
import { createDocument } from "../../scripts/Docx";
import {
  getBedrockResponse,
  getCaluseTags,
  getNumberTags,
  getTitleTags,
} from "../../scripts/LLMGeneral";
const initial_prompt = j["amend_clause"];
const finalize_prompt = j["amend_finalize"];

const AmendClause = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [contexts, setContexts] = useState<
    {
      title: string;
      context: {
        role: string;
        content: { type: string; text: string }[];
      }[];
    }[]
  >([]);
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

  useEffect(() => {
    const handleAddClause = async () => {
      const newPrompt = initial_prompt.replaceAll(
        "--CLAUSE--",
        currentClause.title + " " + currentClause.clause.toString()
      );

      const newContext = [
        ...contexts,
        {
          title: currentClause.title,
          context: [
            { role: "user", content: [{ type: "text", text: newPrompt }] },
          ],
        },
      ];

      setContexts(newContext);

      setLoading(true);
      const r = await getBedrockResponse(
        newContext.find((c) => c.title === currentClause.title)?.context ?? []
      );

      newContext
        .find((c) => c.title === currentClause.title)
        ?.context.push({ role: "assistant", content: r });
      setContexts(newContext);
      setLoading(false);
    };

    if (currentClause.title !== "" && currentClause.clause !== "") {
      handleAddClause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClause]); // handle loading

  useEffect(() => {
    const handleExport = async (docu: { title: string; content: string }[]) => {
      const message =
        finalize_prompt + docu.map((doc) => doc.content).join(" ");
      const context = {
        role: "user",
        content: [{ type: "text", text: message }],
      };

      const response = await getBedrockResponse([context]);
      console.log("response:", JSON.stringify(response, null, 2));

      const clauses = [];
      while (true) {
        const currentClause = getNumberTags(clauses.length + 1, response);
        if (currentClause === "") {
          break;
        }

        const title = getTitleTags([{ type: "text", text: currentClause }]);
        const clause = getCaluseTags([{ type: "text", text: currentClause }]);
        clauses.push({ title, content: clause });
      }

      console.log("clauses:", JSON.stringify(clauses, null, 2));

      const title = `Scope of Work Amendment - ${new Date().toDateString()}`;
      createDocument(title, clauses);
    };

    if (accepted) {
      const context = contexts.find(
        (c) => c.title === currentClause.title
      )?.context;
      if (context) {
        const response = context[context.length - 2].content ?? ""; // -2 here bc its adding another response for some reason
        const clause = getCaluseTags(response);
        const doc = [
          {
            title: currentClause.title,
            content: clause,
          },
        ];

        handleExport(doc);
      } else {
        console.log("context not found");
      }

      setAccepted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted]); // handle accepted clause

  return (
    <div>
      <Navbar />
      <div className="horizontal">
        <AmendInput setClause={setCurrentClause} />
        <SOWChat
          loading={loading}
          setLoading={setLoading}
          contexts={contexts}
          setContexts={setContexts}
          setAccepted={setAccepted}
          currentClause={currentClause}
          setCurrentClause={setCurrentClause}
          document={document}
          title={"Amend Clause"}
        />
      </div>
    </div>
  );
};

export default AmendClause;
