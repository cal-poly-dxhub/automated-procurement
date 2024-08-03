import { useState } from "react";
import { theme } from "../assets/theme";
import Container from "../components/Container";

const Member = () => {
  const [hover, setHover] = useState<boolean>(false);

  const hoverStyle = {
    backgroundColor: hover ? theme.colors.alternate : theme.colors.background,
    transform: hover ? "scale(0.99)" : "scale(1)",
  };

  return (
    // <div
    //   style={{ ...styles.container, ...hoverStyle }}
    //   onMouseEnter={() => setHover(true)}
    //   onMouseLeave={() => setHover(false)}
    //   className="row"
    // >
    <Container
      style={styles.container}
      backgroundColors={[theme.colors.alternate, theme.colors.background]}
    >
      <p>first name</p>
      <p>last name</p>
      <p>permission</p>
    </Container>
  );
};

export default Member;

const styles = {
  container: {
    transition: "background-color 0.2s",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
};
