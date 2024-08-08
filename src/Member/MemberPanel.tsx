import Container from "../components/Container";
import Text from "../components/Text";
import Member from "./Member";

import companies from "../assets/company.json";

const MemberPanel = ({ style }: { style?: any }) => {
  const sortedMembers = companies.members.sort(
    (a, b) =>
      (a.permission === "admin" ? 1 : -1) + (b.permission === "admin" ? 1 : -1)
  );
  return (
    <Container style={{ ...styles.container, ...style }} className="scrollY">
      <Text type="title">{companies.company} Members</Text>
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
