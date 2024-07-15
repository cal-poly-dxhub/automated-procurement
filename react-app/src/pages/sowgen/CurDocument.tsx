import { createDocument } from "../../scripts/Docx";
import "./CurDocument.css";

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
  const handleExport = () => {
    if (!documentTitle) {
      const title = `ScopeOfWork${new Date().getTime()}`;
      createDocument(title, document);
      return;
    }

    createDocument(documentTitle, document);
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
        <button onClick={handleExport} className="button">
          Export to Word
        </button>
      </div>
    </div>
  );
};

export default CurDocument;
