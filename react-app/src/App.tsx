import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ContractGen from "./pages/ContractGen";
import ContractRead from "./pages/ContractRead";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contract-gen" element={<ContractGen />} />
        <Route path="/contract-read" element={<ContractRead />} />
      </Routes>
    </Router>
  );
}

export default App;
