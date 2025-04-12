import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import Header from "./assets/components/header";
import Photos from "./pages/PhotoPage";
import Albums from "./pages/AlbumPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;
