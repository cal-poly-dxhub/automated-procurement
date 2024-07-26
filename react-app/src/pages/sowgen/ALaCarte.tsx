import { useState } from "react";
import json from "../../assets/SOWCategories.json";
import "./ALaCarte.css";

const ALaCarte = ({
  currentCategory,
  currentClause,
  handleAddClause,
  document,
  debug = false,
}: {
  currentCategory: string;
  currentClause: { title: string; clause: string };
  handleAddClause: (clause: any) => void;
  document: { title: string; content: string }[];
  debug?: boolean;
}) => {
  const [customModal, setCustomModal] = useState<boolean>(false);
  const [customTemplate, setCustomTemplate] = useState<{
    title: string;
    clause: string;
  }>({
    title: "",
    clause: "",
  });

  const templates = json.Clauses.filter(
    (clause) => clause.category === currentCategory || clause.category === "All"
  );

  const [customTemplates, setCustomTemplates] = useState<
    { title: string; clause: string }[]
  >([]);

  const handleAddCustomClause = () => {
    setCustomTemplates([...customTemplates, customTemplate]);
    setCustomTemplate({ title: "", clause: "" });
    setCustomModal(false);
  };

  const getClassName = (clause: any) => {
    if (currentClause.title === clause.title) {
      return "clause-selected";
    } else if (document.find((doc) => doc.title === clause.title)) {
      return "clause-included";
    }

    return "clause-item";
  };

  return (
    <div className="a-la-carte">
      <h1>Add Clauses</h1>
      <div className="clauses">
        {templates.map((clause, index) => {
          return (
            <div key={index} className="clause-category">
              <h2>{clause.category}</h2>
              <div className="clauses">
                {clause.clauses.map((clause, index) => {
                  const selected = currentClause.title === clause.title;
                  const inDocument = document.find(
                    (doc) => doc.title === clause.title
                  )
                    ? true
                    : false;
                  return (
                    <div key={index} className={getClassName(clause)}>
                      <span>{clause.title}</span>
                      <button
                        className="button"
                        disabled={selected || inDocument}
                        onClick={() => {
                          handleAddClause(clause);
                        }}
                      >
                        Add Clause
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="clause-category">
          <h2>Custom Clauses</h2>
          {customTemplates.map((clause, index) => {
            const selected = currentClause.title === clause.title;
            const inDocument = document.find(
              (doc) => doc.title === clause.title
            )
              ? true
              : false;
            return (
              <div key={index} className={getClassName(clause)}>
                <span>{clause.title}</span>
                <button
                  className="button"
                  onClick={() => handleAddClause(clause)}
                  disabled={selected || inDocument}
                >
                  Add Clause
                </button>
              </div>
            );
          })}
          <div className="clause-item">
            <span>Custom Clause</span>
            <button className="button" onClick={() => setCustomModal(true)}>
              Add Clause
            </button>
          </div>
        </div>
      </div>
      {customModal && (
        <div className="modal-background">
          <div className="modal-box">
            <div className="modal-title">
              <h2>Add Custom Clause</h2>
            </div>
            <div className="modal-content">
              <input
                placeholder="Enter the title of the clause..."
                onChange={(e) =>
                  setCustomTemplate({
                    ...customTemplate,
                    title: e.target.value,
                  })
                }
                className="input modal-input"
              />
              <textarea
                placeholder="Enter your custom clause here..."
                onChange={(e) => {
                  setCustomTemplate({
                    ...customTemplate,
                    clause: e.target.value,
                  });
                }}
                className="input modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button className="button" onClick={handleAddCustomClause}>
                Add Clause
              </button>
              <button
                className="button"
                onClick={() => {
                  setCustomTemplate({ title: "", clause: "" });
                  setCustomModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ALaCarte;
