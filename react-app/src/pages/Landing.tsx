import Navbar from "../components/Navbar";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="centered-text">
        <h1>DxHub Automated Procurement</h1>
        <h2>Powered by AWS</h2>
        <div className="button-row">
          <ul className="ul-row">
            <li>
              <a href="/sow-gen" className="button">
                Scope of Work Generator
              </a>
            </li>
            <li>
              <a href="/contract-gen" className="button">
                Contract Generator
              </a>
            </li>
            <li>
              <a href="/contract-read" className="button">
                Contract Reader
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
