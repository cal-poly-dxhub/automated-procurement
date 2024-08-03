import { useState } from "react";
import { theme } from "../assets/theme";
import Member from "./Member";

const MemberPanel = ({ style }: { style?: any }) => {
  const [hover, setHover] = useState<boolean>(false);

  const hoverStyle = {
    backgroundColor: hover
      ? theme.colors.alternateBackground
      : theme.colors.background,
  };

  return (
    <div
      style={{ ...styles.container, ...hoverStyle, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="column"
    >
      <h2>%company Members</h2>
      {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <Member />
      ))}
    </div>
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
