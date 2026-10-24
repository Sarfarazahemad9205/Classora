import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";

function AppNavbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${location.pathname === "/" ? " site-header--hero" : " site-header--solid"}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="site-brand" onClick={closeMenu}><span className="brand-mark"><Icon name="book" size={19} /></span><span>Classora<small>LEARN WITH PURPOSE</small></span></Link>
        <button type="button" className="nav-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <Icon name="close" /> : <Icon name="menu" />}</button>
        <div className={`site-nav-content${menuOpen ? " is-open" : ""}`}>
          <div className="site-nav-links">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/subjects" onClick={closeMenu}>Subjects</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            {user?.role === "admin" && <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>}
          </div>
          <div className="site-nav-actions">{user ? <Link className="nav-cta" to="/subjects" onClick={closeMenu}>Start learning <span>↗</span></Link> : <><Link className="nav-login" to="/login" onClick={closeMenu}>Log in</Link><Link className="nav-cta" to="/register" onClick={closeMenu}>Get started <span>↗</span></Link></>}</div>
        </div>
      </nav>
    </header>
  );
}

export default AppNavbar;



