import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Container } from 'react-bootstrap'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from './components/Header'
import Footer from './components/Footer'


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}


function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
      </>
      <main
        className="py-3"
        style={{
          backgroundColor: "  #000",
        }}
      >
        <Container>
          <Routes>
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
      </main>
      <>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App
