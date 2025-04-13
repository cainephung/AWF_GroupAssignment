// imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Header
import Header from "./assets/components/header";
//Login/Register
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
// Pages
import ForgotPasswordPage from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import Photos from "./pages/PhotoPage";
import Albums from "./pages/AlbumPage";
// Protected Route 
import ProtectedRoute from "./assets/components/ProtectedRoute";


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
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <HomePage />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
