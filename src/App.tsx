import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AmendClause from "./pages/amend/AmendClause";
import ContractGen from "./pages/ContractGen";
import ContractRead from "./pages/ContractRead";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IntroPage from "./pages/sowgen/IntroPage";
import SOWFinish from "./pages/sowgen/SOWFinish";
import SOWGen from "./pages/sowgen/SOWGen";
import SOWReadthrough from "./pages/sowgen/SOWReadthrough";

import Dashboard from "./Dashboard/Dashboard";
import EditPage from "./Document/EditPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/contract-gen" element={<ContractGen />} />
        <Route path="/contract-read" element={<ContractRead />} />
        <Route path="/sow-intro" element={<IntroPage />} />
        <Route path="/sow-gen" element={<SOWGen />} />
        <Route path="/sow-finish" element={<SOWFinish />} />
        <Route path="/sow-readthrough" element={<SOWReadthrough />} />
        <Route path="/amend-clause" element={<AmendClause />} />
        {/* not in nav */}
        <Route path="/edit-document" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
