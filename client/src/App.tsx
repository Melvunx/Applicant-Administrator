import { Route, Routes } from "react-router-dom";
import Archive from "./Pages/Archive";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
