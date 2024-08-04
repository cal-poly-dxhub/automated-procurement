import Container from "../components/Container";
import Member from "./Member";

const MemberPanel = ({ style }: { style?: any }) => {
  return (
    <Container style={{ ...styles.container, ...style }} className="scrollY">
      <h2>%company Members</h2>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <Member />
      ))}
    </Container>
  );
};

export default MemberPanel;

const styles = {
  container: {
    flex: 1,
    transition: "background-color 0.2s",
    padding: 10,
    height: "93vh",
  },
};
