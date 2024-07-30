import { useNavigate } from "react-router-dom";
import "./CurDocument.css";

const CurDocument = ({
  document,
  setDocument,
  documentTitle,
  setCurrentClause,
  sowgenContext,
  debug = false,
}: {
  document: {
    title: string;
    content: string;
    summary: string;
    truths: string;
  }[];
  setDocument: (
    document: {
      title: string;
      content: string;
      summary: string;
      truths: string;
    }[]
  ) => void;
  documentTitle: string | null;
  setCurrentClause: (currentClause: {
    title: string;
    clause: string;
    summary: string;
    truths: string;
  }) => void;
  sowgenContext: {
    contexts: {
      title: string;
      context: { role: string; content: { type: string; text: string }[] }[];
    }[];
    category: string | null;
    userInstitution: string | null;
    supplier: string | null;
    documentPurpose: string | null;
    document: {
      title: string;
      content: string;
      summary: string;
      truths: string;
    }[];
    currentClause: {
      title: string;
      clause: string;
      summary: string;
      truths: string;
    };
    documentTitle: string | null;
  };
  debug?: boolean;
}) => {
  const navigate = useNavigate();
  const handleExport = async () => {
    navigate("/sow-finish", {
      state: sowgenContext,
    });
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
                  setCurrentClause({
                    title: doc.title,
                    clause: doc.content,
                    summary: "",
                    truths: "",
                  });
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
        {debug && (
          <button className="button" onClick={() => console.log(document)}>
            Log Document
          </button>
        )}
      </div>
    </div>
  );
};

export default CurDocument;
