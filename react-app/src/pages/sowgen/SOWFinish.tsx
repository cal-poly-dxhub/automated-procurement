import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import prompts from "../../assets/prompt.json";
import Navbar from "../../components/Navbar";
import { downloadDocument } from "../../scripts/Docx";
import {
  getBedrockResponse,
  getCaluseTags,
  getNumberTags,
  getTitleTags,
} from "../../scripts/LLMGeneral";
import "./SOWFinish.css";

const sow_finalize = prompts["sow_finalize"];

const Finish = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const document: { title: string; content: string; summary: string }[] =
    location.state?.document || [];
  const documentTitle = location.state?.documentTitle || null;

  // for going back to edit document
  const context: { title: string; content: string }[] =
    location.state?.context || [];

  const generated = useRef(false);
  const [formattedDocument, setFormattedDocument] = useState<
    { title: string; content: string }[]
  >([]);

  const handleExport = async () => {
    const message = sow_finalize + document.map((doc) => doc.content).join(" ");
    const context = {
      role: "user",
      content: [{ type: "text", text: message }],
    };

    const response = await getBedrockResponse([context]);

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

    setFormattedDocument(clauses);
  };

  useEffect(() => {
    if (!generated.current) {
      generated.current = true;
      handleExport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generated.current]); // generate document on start

  return (
    <div className="sow-finish-container">
      <Navbar />
      <div className="sow-finish">
        <h1>Finalize and Export Document</h1>
        <div className="document">
          <h2>{documentTitle}</h2>
          {formattedDocument &&
            formattedDocument.map((doc, index) => (
              <div key={index} className="doc-clause">
                <h3>{doc.title}</h3>
                <p>{doc.content}</p>
              </div>
            ))}
          {formattedDocument.length === 0 && <p>Generating Document...</p>}
        </div>
        <div className="doc-buttons">
          <button
            className="button"
            onClick={() => {
              navigate("/sow-gen", {
                state: { document, context },
              });
            }}
          >
            Edit Document
          </button>
          <button
            className="button"
            onClick={() => {
              downloadDocument(documentTitle, formattedDocument);
            }}
          >
            Download Document
          </button>
          <button
            className="button"
            onClick={() => {
              setFormattedDocument([]);
              generated.current = false;
            }}
          >
            Reformat Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finish;
