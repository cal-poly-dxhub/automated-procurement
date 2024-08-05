import { theme } from "../assets/theme";
import Item from "../components/Item";

const Member = () => {
  return (
    <Item
      style={styles.container}
      hoverBackgroundColor={theme.colors.alternate}
      className="row"
    >
      <div className="row" style={styles.nameBox}>
        <p>%first</p>
        <p>%last</p>
      </div>
      <p>%permission</p>
    </Item>
  );
};

export default Member;

const styles = {
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginBottom: 10,
    maxHeight: "5rem",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  nameBox: {
    gap: "0.25rem",
    maxWidth: "11rem",
    overflow: "hidden",
  },
};
