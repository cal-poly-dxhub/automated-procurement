import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">DxHub Procurement</a>
      </div>
      <div className="navbar-links">
        <a href="/contract-gen">Contract Generator</a>
      </div>
    </nav>
  );
};

export default Navbar;
