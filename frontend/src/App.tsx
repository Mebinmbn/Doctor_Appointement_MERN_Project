import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientLogin from "./patient/pages/PatientLogin";
import { ToastContainer } from "react-toastify";
import OTPVerification from "./patient/pages/OtpVeryfication";
import Home from "./patient/pages/Home";


function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PatientLogin />} />
          <Route path="/otp" element={<OTPVerification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
