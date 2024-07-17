import prompts from "../../assets/prompt.json";
import { createDocument } from "../../scripts/Docx";
import {
  getBedrockResponse,
  getCaluseTags,
  getNumberTags,
  getTitleTags,
} from "../../scripts/LLMGeneral";
import "./CurDocument.css";

const sow_finalize = prompts["sow_finalize"];

const CurDocument = ({
  document,
  setDocument,
  documentTitle,
  setCurrentClause,
}: {
  document: { title: string; content: string }[];
  setDocument: (document: { title: string; content: string }[]) => void;
  documentTitle: string | null;
  setCurrentClause: (currentClause: { title: string; clause: string }) => void;
}) => {
  const handleExport = async () => {
    // first send document to llm and get back the final document
    // then export the final document
    const message = sow_finalize + document.map((doc) => doc.content).join(" ");
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

    if (!documentTitle) {
      const title = `ScopeOfWork${new Date().getTime()}`;
      createDocument(title, clauses);
      return;
    }

    createDocument(documentTitle, clauses);
  };

  return (
    <div className="current-document">
      <h1>Current Document</h1>
      <div className="documnet">
        {document.map((doc, index) => (
          <div key={index} className="doc-item">
            <h3>{doc.title}</h3>
            <p>{doc.content}</p>
            <div className="doc-buttons">
              <button
                onClick={() => {
                  setCurrentClause({ title: doc.title, clause: doc.content });
                }}
                className="button"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDocument(document.filter((_, i) => i !== index));
                }}
                className="button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="doc-bottom-buttons">
        <button className="button" onClick={handleExport}>
          Export Document
        </button>
      </div>
    </div>
  );
};

export default CurDocument;
