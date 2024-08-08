import Container from "../components/Container";
import Text from "../components/Text";
import Document from "./Document";

import documents from "../assets/documents.json";

const RecentDocumentPanel = ({ style }: { style?: any }) => {
  return (
    <Container className="column" style={{ ...styles.container, ...style }}>
      <Text type="title" style={{ marginBottom: "1rem" }}>
        Recent Documents
      </Text>
      <div style={styles.documents} className="row flex-grid">
        {documents.map((d) => (
          <Document d={d} style={styles.item} />
        ))}
      </div>
    </Container>
  );
};

export default RecentDocumentPanel;

const styles = {
  container: {
    padding: "1rem",
  },
  documents: {
    // flexWrap: "wrap",
  },
  item: {
    width: "30%",
    margin: 10,
  },
};
