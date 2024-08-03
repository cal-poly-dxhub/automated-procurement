import Container from "./Container";
import "./Navbar.css";

const Navbar = ({ style }: { style?: any }) => {
  return (
    <Container className="navbar" style={style}>
      <div className="navbar-brand">
        <a href="/">DxHub Procurement</a>
      </div>
      <div className="navbar-links">
        {/* <a href="/contract-gen">Contract Generator</a>
        <a href="/contract-read">Contract Reader</a> */}
        <a href="/sow-intro">SOW Generator</a>
        <a href="/amend-clause">Amend Clause</a>
      </div>
    </Container>
  );
};

export default Navbar;
