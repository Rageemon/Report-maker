import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import EventReport from "./pages/report";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<EventReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

