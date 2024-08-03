import Container from "../components/Container";
import Member from "./Member";

const MemberPanel = ({ style }: { style?: any }) => {
  return (
    <Container style={{ ...styles.container, ...style }}>
      <h2>%company Members</h2>
      {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <Member />
      ))}
    </Container>
  );
};

export default MemberPanel;

const styles = {
  container: {
    flex: 1,
    height: "100vh",
    transition: "background-color 0.2s",
    padding: 10,
    marginBottom: 5,
  },
};
