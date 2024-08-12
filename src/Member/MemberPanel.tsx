import Container from "../components/Container";
import Text from "../components/Text";
import Member from "./Member";

import companies from "../assets/companies.json";
import { _style } from "../assets/types";

const MemberPanel = ({ style }: { style?: _style }) => {
  const sortedMembers = companies.members.sort(
    (a, b) =>
      (b.permission === "admin" ? 1 : -1) - (a.permission === "admin" ? 1 : -1)
  );
  return (
    <Container style={{ ...styles.container, ...style }} className="scrollY">
      <Text type="title">{companies.name} Members</Text>
      {sortedMembers.map((m) => (
        <Member m={m} />
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
