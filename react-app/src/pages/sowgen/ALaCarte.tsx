import "./ALaCarte.css";

const ALaCarte = ({
  clauses,
  currentClause,
  handleAddClause,
}: {
  clauses: any[];
  currentClause: { title: string; clause: string };
  handleAddClause: (clause: any) => void;
}) => {
  return (
    <div className="a-la-carte">
      <h1>Add Clauses</h1>
      <div className="clauses">
        {clauses.map((clause, index) => {
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
      </div>
    </div>
  );
};

export default ALaCarte;
