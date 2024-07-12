import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SOWIntro.css";

const SOWIntro = () => {
  const navigate = useNavigate();
  const [userInstitution, setUserInstitution] = useState("");
  const [hiringInstitution, setHiringInstitution] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");

  const handleSubmit = () => {
    navigate(
      `/sow-gen?userInstitution=${encodeURIComponent(
        userInstitution
      )}&hiringInstitution=${encodeURIComponent(
        hiringInstitution
      )}&scopeOfWork=${encodeURIComponent(scopeOfWork)}`
    );
  };

  return (
    <div className="sow-intro-container">
      <div className="chat-box-title">
        <h2>Scope of Work Generator Introduction</h2>
      </div>
      <div className="intro-container">
        <div className="input-group">
          <label htmlFor="userInstitution">Your Institution:</label>
          <input
            type="text"
            id="userInstitution"
            value={userInstitution}
            onChange={(e) => setUserInstitution(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hiringInstitution">Institution You're Hiring:</label>
          <input
            id="hiringInstitution"
            value={hiringInstitution}
            onChange={(e) => setHiringInstitution(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="scopeOfWork">Scope of Work:</label>
          <input
            type="text"
            id="scopeOfWork"
            value={scopeOfWork}
            onChange={(e) => setScopeOfWork(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SOWIntro;
