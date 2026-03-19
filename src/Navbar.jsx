import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ onLogin, onSignUp, activePage = 'home' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="lp-header-standard">
      <div className="lp-header-inner">
        <div className="sa-logo-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-cv">CV</span>
          <span className="logo-unlocked">Unlocked</span>
        </div>

        {/* Desktop nav */}
        <nav className="lp-nav-links">
          <Link to="/" className={`lp-nav-link ${activePage === 'home' ? 'lp-nav-link--active' : ''}`}>Home</Link>
          <Link to="/find-job" className={`lp-nav-link ${activePage === 'find-job' ? 'lp-nav-link--active' : ''}`}>Find Job</Link>
          <Link to="/team" className={`lp-nav-link ${activePage === 'team' ? 'lp-nav-link--active' : ''}`}>Our team</Link>
          <Link to="/pricing" className={`lp-nav-link ${activePage === 'pricing' ? 'lp-nav-link--active' : ''}`}>Our pricing</Link>
          <Link to="/contact" className={`lp-nav-link ${activePage === 'contact' ? 'lp-nav-link--active' : ''}`}>Contact us</Link>
        </nav>

        {/* Desktop buttons */}
        <div className="lp-header-actions-right lp-header-actions-desktop">
          <button className="lp-btn-login-ghost" onClick={onLogin}>Login</button>
          <button className="lp-btn-signup-solid" onClick={onSignUp}>Register</button>
        </div>

        {/* Mobile hamburger */}
        <button className="lp-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="lp-mobile-menu">
          <Link to="/" className={`lp-mobile-link ${activePage === 'home' ? 'lp-nav-link--active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/find-job" className={`lp-mobile-link ${activePage === 'find-job' ? 'lp-nav-link--active' : ''}`} onClick={closeMenu}>Find Job</Link>
          <Link to="/team" className={`lp-mobile-link ${activePage === 'team' ? 'lp-nav-link--active' : ''}`} onClick={closeMenu}>Our team</Link>
          <Link to="/pricing" className={`lp-mobile-link ${activePage === 'pricing' ? 'lp-nav-link--active' : ''}`} onClick={closeMenu}>Our pricing</Link>
          <Link to="/contact" className={`lp-mobile-link ${activePage === 'contact' ? 'lp-nav-link--active' : ''}`} onClick={closeMenu}>Contact us</Link>
          <div className="lp-mobile-menu-actions">
            <button className="lp-btn-login-ghost" onClick={() => { onLogin(); closeMenu(); }}>Login</button>
            <button className="lp-btn-signup-solid" onClick={() => { onSignUp(); closeMenu(); }}>Register</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
