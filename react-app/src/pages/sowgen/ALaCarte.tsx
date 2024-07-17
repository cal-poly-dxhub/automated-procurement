import { useState } from "react";
import "./ALaCarte.css";

const ALaCarte = ({
  templates,
  setTemplates,
  currentClause,
  handleAddClause,
}: {
  templates: {
    title: string;
    clause: string;
  }[];
  setTemplates: (templates: { title: string; clause: string }[]) => void;
  currentClause: { title: string; clause: string };
  handleAddClause: (clause: any) => void;
}) => {
  const [customModal, setCustomModal] = useState<boolean>(false);
  const [customTemplate, setCustomTemplate] = useState<{
    title: string;
    clause: string;
  }>({
    title: "",
    clause: "",
  });

  return (
    <div className="a-la-carte">
      <h1>Add Clauses</h1>
      <div className="clauses">
        {templates.map((clause, index) => {
          const selected = currentClause.title === clause.title;

          return (
            <div
              key={index}
              className={selected ? "clause-selected" : "clause-item"}
            >
              <span>{clause.title}</span>
              <button
                className="button"
                disabled={selected}
                onClick={() => {
                  handleAddClause(clause);
                }}
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
              ></textarea>
            </div>
            <div className="modal-buttons">
              <button
                className="button"
                onClick={() => {
                  setTemplates([...templates, customTemplate]);
                  setCustomTemplate({ title: "", clause: "" });
                  setCustomModal(false);
                }}
              >
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
