import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          1HealthHub
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </NavLink>

          <div className="auth-buttons">
            <Link
              to="/login"
              className="login-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="signup-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
