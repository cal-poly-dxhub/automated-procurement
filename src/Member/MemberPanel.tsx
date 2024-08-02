import Member from "./Member";

const MemberPanel = ({ style }: { style?: any }) => {
  return (
    <div style={{ ...styles.container, ...style }} className="column">
      <h2>memberpanel</h2>
      {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <Member />
      ))}
    </div>
  );
};

export default MemberPanel;

const styles = {
  container: {
    display: "flex",
    flex: 1,
    padding: "1rem",
  },
};
