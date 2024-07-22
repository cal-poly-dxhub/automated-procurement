import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ContractGen from "./pages/ContractGen";
import ContractRead from "./pages/ContractRead";
import Landing from "./pages/Landing";
import IntroPage from "./pages/sowgen/IntroPage";
import SOWGen from "./pages/sowgen/SOWGen";
import SOWReadthrough from "./pages/sowgen/SOWReadthrough";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contract-gen" element={<ContractGen />} />
        <Route path="/contract-read" element={<ContractRead />} />
        <Route path="/sow-intro" element={<IntroPage />} />
        <Route path="/sow-gen" element={<SOWGen />} />
        <Route path="/sow-readthrough" element={<SOWReadthrough />} />
      </Routes>
    </Router>
  );
};

export default App;
