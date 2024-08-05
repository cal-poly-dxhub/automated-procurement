import Container from "../components/Container";
import Document from "./Document";

const DocumentPanel = ({ style }: { style?: any }) => {
  return (
    <Container
      className="column scrollY"
      style={{ ...styles.container, ...style }}
    >
      <h2>Documents</h2>
      <div style={styles.documents} className="row flex-grid">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
          <Document style={styles.item} />
        ))}
      </div>
    </Container>
  );
};

export default DocumentPanel;

const styles = {
  container: {
    display: "flex",
    flex: 1,
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
