const Document = ({ style }: { style?: any }) => {
  return (
    <div style={{ ...style, ...styles.container }}>
      <p>document</p>
    </div>
  );
};

export default Document;

const styles = {
  container: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "15rem",
    height: "15rem",
  },
};
