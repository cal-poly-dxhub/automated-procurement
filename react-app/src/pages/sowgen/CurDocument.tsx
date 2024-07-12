import { createDocument } from "../../scripts/Docx";
import "./CurDocument.css";

const CurDocument = ({
  document,
  setDocument,
}: {
  document: { title: string; content: string }[];
  setDocument: (document: { title: string; content: string }[]) => void;
}) => {
  const onTestPress = () => {
    setDocument([...document, { title: "Test", content: "Test Content" }]);
  };

  const handleExport = () => {
    createDocument("test", document);
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
