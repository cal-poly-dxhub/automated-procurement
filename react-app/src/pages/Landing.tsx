import Navbar from "../components/Navbar";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="centered-text">
        <h1>Welcome to DxHub Procurement</h1>
      </div>
    </div>
  );
};

export default Landing;
