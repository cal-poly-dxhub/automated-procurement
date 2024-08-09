import Container from "../components/Container";
import Document from "./Document";

import documents from "../assets/documents.json";
import Text from "../components/Text";

import { useState } from "react";
import categories from "../assets/categories.json";
import { _style } from "../assets/types";

const CategoryDocumentPanel = ({ style }: { style?: _style }) => {
  const [category, setCategory] = useState<any>({ title: "General Services" });
  return (
    <Container
      className="column scrollY"
      style={{ ...styles.container, ...style }}
    >
      <div
        className="row"
        style={{ alignItems: "center", marginBottom: "1rem" }}
      >
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((c) => (
            <option key={c.title} value={c.title}>
              <Text type="title">{c.title}</Text>
            </option>
          ))}
        </select>
        <Text type="title">Documents</Text>
      </div>
      {/* <select> */}
      <div style={styles.documents} className="row flex-grid">
        {documents
          .filter((d) => d.category === category)
          .map((d) => (
            <Document d={d} style={styles.item} />
          ))}
      </div>
    </Container>
  );
};

export default CategoryDocumentPanel;

const styles = {
  container: {
    display: "flex",
    flex: 1,
    padding: "1rem",
  },
  select: {
    marginRight: 10,
    height: "80%",
  },
  documents: {
    // flexWrap: "wrap",
  },
  item: {
    width: "30%",
    margin: 10,
  },
};
