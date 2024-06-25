import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import ContractGen from "./pages/ContractGen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContractGen />} />
      </Routes>
    </Router>
  );
}

export default App;
