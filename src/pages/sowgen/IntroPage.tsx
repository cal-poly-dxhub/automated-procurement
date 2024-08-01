import { useState } from "react";
import { useNavigate } from "react-router-dom";
import json from "../../assets/SOWCategories.json";
import Navbar from "../../components/Navbar";
import "./IntroPage.css";

const categories = json.Categories;

const IntroPage = () => {
  const navigate = useNavigate();
  const [userInstitution, setUserInstitution] = useState("");
  const [supplier, setSupplier] = useState("");
  const [documentPurpose, setDocumentPurpose] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    navigate(
      `/sow-gen?category=${encodeURIComponent(
        category
      )}&userInstitution=${encodeURIComponent(
        userInstitution
      )}&supplier=${encodeURIComponent(
        supplier
      )}&documentPurpose=${encodeURIComponent(documentPurpose)}`
    );
  };

  return (
    <div>
      <Navbar />
      <div className="intro-page-container">
        <div className="intro-page-title">
          <h2>Scope of Work Document Generator</h2>
        </div>
        <div className="intro-form-container">
          <div className="input-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.title} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="userInstitution">Your Institution:</label>
            <input
              type="text"
              id="userInstitution"
              value={userInstitution}
              onChange={(e) => setUserInstitution(e.target.value)}
              placeholder="Enter your institution name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="supplier">Supplier You're Hiring:</label>
            <input
              id="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Enter the supplier name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="documentPurpose">Document Purpose:</label>
            <textarea
              id="documentPurpose"
              value={documentPurpose}
              onChange={(e) => setDocumentPurpose(e.target.value)}
              className="input"
              placeholder="General purpose of the document"
            />
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Generate Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
