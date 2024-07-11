import "./ALaCarte.css";

const ALaCarte = ({
  clauses,
  currentClause,
  handleAddClause,
}: {
  clauses: any[];
  currentClause: number | undefined;
  handleAddClause: (clause: any) => void;
}) => {
  return (
    <div className="a-la-carte">
      {/* shows all clauses with buttons to chat w the llm about */}
      <h1>Add Clauses</h1>
      <div className="clauses">
        {clauses.map((clause, index) => (
          <div
            key={index}
            className={
              currentClause === clause ? "clause-selected" : "clause-item"
            }
          >
            <span>{clause.title}</span>
            <button
              className="button"
              onClick={() => {
                handleAddClause(clause);
              }}
            >
              Add Clause
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ALaCarte;
