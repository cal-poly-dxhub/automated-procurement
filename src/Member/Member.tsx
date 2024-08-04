import { theme } from "../assets/theme";
import Container from "../components/Container";

const Member = () => {
  return (
    <Container
      style={styles.container}
      hoverBackgroundColor={theme.colors.alternate}
      clickable
      className="row"
    >
      <div className="row" style={{ gap: "0.5rem" }}>
        <p>first name</p>
        <p>last name</p>
      </div>
      <p>permission</p>
    </Container>
  );
};

export default Member;

const styles = {
  container: {
    // transition: "background-color 0.2s",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "space-between",
  },
};
