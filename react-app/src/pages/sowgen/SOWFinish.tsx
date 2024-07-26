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
  } = location.state;

  // for going back to edit document
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
              navigate(
                `/sow-gen?category=${sowgenContext.category}&userInstitution=${sowgenContext.userInstitution}&supplier=${sowgenContext.supplier}&documentPurpose=${sowgenContext.documentPurpose}`,
                {
                  state: {
                    sowgenContext,
                  },
                }
              );
            }}
          >
            Edit Document
          </button>
          <button
            className="button"
            onClick={() => {
              if (!generated.current) {
                return;
              }

              downloadDocument(documentTitle, formattedDocument);
            }}
          >
            Download Document
          </button>
          <button
            className="button"
            onClick={() => {
              if (!generated.current) {
                return;
              }

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
