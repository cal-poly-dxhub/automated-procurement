type _document = {
  title: string;
  date: string;
  category: string;
  institution: string;
  supplier: string;
  clauses: _clause[];
};

type _clause = { title: string; content: string };

export type { _clause, _document };
