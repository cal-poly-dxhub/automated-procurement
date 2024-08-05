import Container from "./Container";
import Link from "./Link";

const Navbar = ({ style }: { style?: any }) => {
  return (
    <Container style={{ ...styles.container, ...style }}>
      <div className="no-dec" style={styles.brand}>
        <a href="/" className="no-dec">
          DxHub Automated Procurement
        </a>
      </div>
      <div className="navbar-links">
        {/* <a href="/contract-gen">Contract Generator</a>
        <a href="/contract-read">Contract Reader</a> */}
        <Link href="/sow-intro" className="no-dec" style={styles.link}>
          SOW Generator
        </Link>
        <Link href="/amend-clause" className="no-dec" style={styles.link}>
          Amend Clause
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
