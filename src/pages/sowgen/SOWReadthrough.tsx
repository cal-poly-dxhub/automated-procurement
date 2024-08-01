import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createDocument } from "../../scripts/Docx";
import "./SOWReadthrough.css";

const SOWReadthrough = () => {
  const { documentTitle, document: dc } = useLocation().state as {
    documentTitle: string;
    document: { title: string; content: string }[];
  };

  const [document, setDocument] =
    useState<{ title: string; content: string }[]>(dc);

  const handleExport = () => {
    if (!document) {
      return alert("No document to export");
    }

    if (!documentTitle) {
      const title = `ScopeOfWork${new Date().getTime()}`;
      createDocument(title, document);
      return;
    }

    createDocument(documentTitle, document);
  };

  return (
    <div className="whole-readthrough">
      <h1>Whole Readthrough</h1>
      <div className="documnet">
        {document.map((doc, index) => (
          <div key={index} className="doc-item">
            <h3>{doc.title}</h3>
            <div className="doc-buttons">
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
          Export Document
        </button>
      </div>
    </div>
  );
};

export default SOWReadthrough;
