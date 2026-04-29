import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UploadResume from "../pages/UploadResume";
import ReviewDashboard from "../pages/ReviewDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/dashboard" element={<ReviewDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;