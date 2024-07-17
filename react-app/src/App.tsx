import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ContractGen from "./pages/ContractGen";
import ContractRead from "./pages/ContractRead";
import Landing from "./pages/Landing";
import SOWGen from "./pages/sowgen/SOWGen";
import SOWIntro from "./pages/sowgen/SOWIntro";
import SOWReadthrough from "./pages/sowgen/SOWReadthrough";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contract-gen" element={<ContractGen />} />
        <Route path="/contract-read" element={<ContractRead />} />
        <Route path="/sow-intro" element={<SOWIntro />} />
        <Route path="/sow-gen" element={<SOWGen />} />
        <Route path="/sow-readthrough" element={<SOWReadthrough />} />
      </Routes>
    </Router>
  );
};

export default App;
