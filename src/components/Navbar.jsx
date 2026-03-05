import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <p>
          🌤 <span>WeatherApp</span>
        </p>
      </div>

      {/* Desktop Links */}
      <div className={`nav-right ${isOpen ? "active" : ""}`}>
        <NavLink to="/" end className="nav-link" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/details" end className="nav-link" onClick={closeMenu}>
          Details
        </NavLink>
        <NavLink to="/favourites" className="nav-link" onClick={closeMenu}>
          Favourites
        </NavLink>
        <NavLink to="/about" className="nav-link" onClick={closeMenu}>
          About
        </NavLink>
      </div>

      {/* Hamburger */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

