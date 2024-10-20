import { Route, Routes } from "react-router-dom";
import Archive from "./Pages/Archive";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Applicant-Administrator/" element={<Home />} />
        <Route path="/Applicant-Administrator/archive" element={<Archive />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
