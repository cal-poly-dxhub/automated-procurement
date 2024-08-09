import { _style } from "../assets/types";
import Container from "./Container";
import Link from "./Link";
import Text from "./Text";

const Navbar = ({ style }: { style?: _style }) => {
  return (
    <Container style={{ ...styles.container, ...style }}>
      <div className="no-dec" style={styles.brand}>
        <Link href="/" className="no-dec">
          <Text type="title">DxHub Automated Procurement</Text>
        </Link>
      </div>
      <div className="row">
        {/* <a href="/contract-gen">Contract Generator</a>
        <a href="/contract-read">Contract Reader</a> */}
        <Link href="/sow-intro" className="no-dec" style={styles.link}>
          <Text type="subtitle">SOW Generator</Text>
        </Link>
        <Link href="/amend-clause" className="no-dec" style={styles.link}>
          <Text type="subtitle">Amend Clause</Text>
        </Link>
      </div>
    </Container>
  );
};

export default Navbar;

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    height: "7vh",
  },
  brand: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  link: {
    marginLeft: 20,
  },
};
