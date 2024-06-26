import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">DxHub Procurement Generator</a>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
