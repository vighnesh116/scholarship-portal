import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ScholarshipResult from "./pages/ScholarshipResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scholarships" element={<ScholarshipResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;