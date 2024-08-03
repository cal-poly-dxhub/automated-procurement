import { useState } from "react";
import { transform } from "../assets/style";
import { theme } from "../assets/theme";

const Member = () => {
  const [hover, setHover] = useState<boolean>(false);

  const hoverStyle = {
    backgroundColor: hover ? theme.colors.alternate : theme.colors.background,
    transform: transform.scale99(hover),
  };

  return (
    <div
      style={{ ...styles.container, ...hoverStyle }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="row"
    >
      <p>first name</p>
      <p>last name</p>
      <p>permission</p>
    </div>
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
