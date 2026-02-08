import { useState } from "react";
import "./Navbar.css";
import "./App.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <ul className="header-home">
        <li
          className="logo"
          style={{ fontFamily: "Caveat, cursive", fontSize: "40px" }}
        >
          <Link to="/" className="header-home1" >
            Punna.in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/resume" className="header-home1">
            Resume
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/project" className="header-home1">
            Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="header-home1">
            Contact
          </Link>
        </li>

        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </ul>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/resume" className="mobile-link" onClick={closeMenu}>
            Resume
          </Link>
        </li>
        <li>
          <Link to="/project" className="mobile-link" onClick={closeMenu}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/contact" className="mobile-link" onClick={closeMenu}>
            Contact
          </Link>
        </li>
      </div>
    </>
  );
}

export default Navbar;