import { useEffect, useState } from "react";
import { createDocument } from "../../scripts/Docx";
import "./CurDocument.css";

const CurDocument = ({
  latestClause,
  commitClause,
  setCommitClause,
}: {
  latestClause: {
    title: string;
    content: string;
  };
  commitClause: boolean;
  setCommitClause: (commitClause: boolean) => void;
}) => {
  const [document, setDocument] = useState<
    {
      title: string;
      content: string;
    }[]
  >([]);

  const onTestPress = () => {
    setDocument([...document, latestClause]);
  };

  const handleExport = () => {
    createDocument("test", document);
  };

  useEffect(() => {
    if (commitClause) {
      setDocument([...document, latestClause]);
      setCommitClause(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitClause]);

  return (
    <div className="current-document">
      <h1>Current Document</h1>
      <div className="documnet">
        {document.map((doc, index) => (
          <div key={index} className="doc-item">
            <h3>{doc.title}</h3>
            <p>{doc.content}</p>
            <div className="doc-buttons">
              <button className="button">Edit</button>
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
        <div className="test-add-button">
          <button onClick={onTestPress} className="button">
            Add Test Clause
          </button>
        </div>
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
