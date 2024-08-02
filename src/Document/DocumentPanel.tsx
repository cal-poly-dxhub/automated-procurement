import Document from "./Document";

const DocumentPanel = ({ style }: { style?: any }) => {
  return (
    <div style={{ ...styles.container, ...style }} className="column">
      <h2>documentpanel</h2>
      <div style={styles.documents} className="row">
        {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
          <Document />
        ))}
      </div>
    </div>
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
    // flexWrap: true,
  },
};
