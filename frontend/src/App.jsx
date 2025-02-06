import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Profile from "./pages/Profile";
import ProfileCategoriesAll from "./pages/ProfileCategoriesAll";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfileBio from "./components/ProfileBio";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <Router>
      <>
        <Header />
      </>
      <div className="app-content">
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/categories" element={<ProfileCategoriesAll />} />
            <Route path="/profile" element={<ProfileBio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
      </div>
      <>
        <Footer />
      </>
    </Router>
  );
}

export default App;
