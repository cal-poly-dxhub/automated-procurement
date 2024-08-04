import Container from "../components/Container";
import Document from "./Document";

const DocumentPanel = ({ style }: { style?: any }) => {
  return (
    <Container className="column" style={{ ...styles.container, ...style }}>
      <h2>documentpanel</h2>
      <div style={styles.documents} className="row">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
          <Document />
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
    transition: "background-color 0.2s",
    height: "93vh",
  },
  documents: {
    // flexWrap: true,
  },
};
