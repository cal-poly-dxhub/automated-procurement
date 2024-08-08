import { theme } from "../assets/theme";
import Item from "../components/Item";
import Text from "../components/Text";

const Member = ({
  m,
}: {
  m: {
    first_name: string;
    last_name: string;
    permission: string;
  };
}) => {
  const { first_name, last_name, permission } = m;

  return (
    <Item
      style={styles.container}
      hoverBackgroundColor={theme.colors.alternate}
      className="row"
    >
      <div className="row" style={styles.nameBox}>
        <Text>{first_name}</Text>
        <Text>{last_name}</Text>
      </div>
      <Text>{permission}</Text>
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
