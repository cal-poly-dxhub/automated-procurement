import Container from "../components/Container";
import Member from "./Member";

const MemberPanel = ({ style }: { style?: any }) => {
  return (
    <Container style={{ ...styles.container, ...style }} className="scrollY">
      <h2>%company Members</h2>
      <Member />
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <Member />
      ))}
    </Container>
  );
};

export default MemberPanel;

const styles = {
  container: {
    padding: 10,
  },
};
