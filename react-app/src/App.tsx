import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ContractGen from "./pages/ContractGen";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contract-gen" element={<ContractGen />} />
      </Routes>
    </Router>
  );
}

export default App;
