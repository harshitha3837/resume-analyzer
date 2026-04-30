import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import UploadResume from "./pages/uploadresume.jsx";
import ReviewDashboard from "./pages/ReviewDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<UploadResume />} />
      <Route path="/review/:id" element={<ReviewDashboard />} />
    </Routes>
  );
}

export default App;