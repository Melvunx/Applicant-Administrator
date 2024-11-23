import { Route, Routes } from "react-router-dom";
import Archive from "./Pages/Archive";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Applicant-Administrator/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/Applicant-Administrator/archive" element={<Archive />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
