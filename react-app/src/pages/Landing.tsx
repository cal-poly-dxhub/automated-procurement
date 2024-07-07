import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Landing.css";

import CONTRACT from "../assets/CONTRACT.json";
import SOW from "../assets/SOW.json";

const Landing = () => {
  const [topButton, setTopButton] = useState("");
  const [middleButton, setMiddleButton] = useState("");

  const contractOptions = Object.keys(CONTRACT);
  const sowOptions = Object.keys(SOW);

  const topButtons = [
    {
      title: "Contract Generator",
    },
    {
      title: "SOW Generator",
    },
    {
      title: "Contract Reader",
    },
  ];

  const middleButtons = [
    contractOptions.map((option) => ({ title: option })),
    sowOptions.map((option) => ({ title: option })),
    [],
  ];

  const handleButtonClick = (title: string) => {
    // check if the title is a top button
    if (topButtons.some((button) => button.title === title)) {
      return setTopButton(title);
    } else {
      setMiddleButton(title);
    }
  };

  const handleSubmit = () => {
    // navigate to the right page based on the top button and send the middle button as a prop
    switch (topButton) {
      case "Contract Generator":
        // navigate to the contract generator page
        break;
      case "SOW Generator":
        // navigate to the sow generator page
        break;
      case "Contract Reader":
        // navigate to the contract reader page
        break;
      default:
        return;
    }
  };

  const getMiddleButtons = () => {
    switch (topButton) {
      case "Contract Generator":
        return middleButtons[0].map((button) => (
          <button
            key={button.title}
            onClick={() => handleButtonClick(button.title)}
            className={
              middleButton === button.title ? "button selected" : "button"
            }
          >
            {button.title}
          </button>
        ));
      case "SOW Generator":
        return middleButtons[1].map((button) => (
          <button
            className={
              middleButton === button.title ? "button selected" : "button"
            }
            key={button.title}
            onClick={() => handleButtonClick(button.title)}
          >
            {button.title}
          </button>
        ));
      case "Contract Reader":
        return middleButtons[2].map((button) => (
          <button
            className={
              middleButton === button.title ? "button selected" : "button"
            }
            key={button.title}
            onClick={() => handleButtonClick(button.title)}
          >
            {button.title}
          </button>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="landing-page">
      <Navbar />
      <div className="centered-text">
        <h1>DxHub Automated Procurement</h1>
        <h2>Powered by AWS</h2>
        <div className="button-row">
          {topButtons.map((button) => (
            <button
              className={
                topButton === button.title ? "button selected" : "button"
              }
              key={button.title}
              onClick={() => handleButtonClick(button.title)}
            >
              {button.title}
            </button>
          ))}
        </div>
        <div className="button-row">{getMiddleButtons()}</div>
        <button className="button submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Landing;
