import Navbar from "../components/Navbar";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="centered-text">
        <h1>DxHub Automated Procurement</h1>
        <h2>Powered by AWS</h2>
      </div>
    </div>
  );
};

export default Landing;
