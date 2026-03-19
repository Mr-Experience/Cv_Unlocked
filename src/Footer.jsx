import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ onSuperAdminLogin, onAdminLogin, onAssociateLogin, onLogin }) => {
  const navigate = useNavigate();

  return (
    <footer className="lp-footer">
      <div className="lp-footer-top">
        {/* Newsletter */}
        <div className="lp-footer-col lp-footer-newsletter">
          <div className="lp-footer-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="logo-cv">CV</span>
            <span className="logo-unlocked">Unlocked</span>
          </div>
          <p className="lp-footer-newsletter-text">Subscribe to our newsletter</p>
          <div className="lp-footer-subscribe">
            <input type="email" placeholder="Email" className="lp-footer-input" />
            <button className="lp-footer-sub-btn">Subscribe</button>
          </div>
        </div>

        {/* Col 2 */}
        <div className="lp-footer-col">
          <h4 className="lp-footer-heading">Work With Us</h4>
          <ul className="lp-footer-links">
            <li><a href="/#how-it-works">How it works</a></li>
            <li><a href="/#find-job">Find a job</a></li>
            <li><a href="/pricing">Our pricing</a></li>
            <li><a href="/#partner">Become a partner</a></li>
            <li><a href="/#refer">Refer a friend</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="lp-footer-col">
          <h4 className="lp-footer-heading">Portal Access</h4>
          <ul className="lp-footer-links">
            <li><button onClick={onSuperAdminLogin} className="footer-link-btn">Super Admin Login</button></li>
            <li><button onClick={onAdminLogin} className="footer-link-btn">Admin Portal</button></li>
            <li><button onClick={onAssociateLogin} className="footer-link-btn">Associate Login</button></li>
            <li><button onClick={onLogin} className="footer-link-btn">Client Login</button></li>
          </ul>
        </div>
      </div>

      {/* Contact bar */}
      <div className="lp-footer-contact-bar">
        <span>hello@cvunlocked.com</span>
        <span className="lp-footer-dot">·</span>
        <span>Support available Mon – Fri, 9am – 6pm WAT</span>
        <span className="lp-footer-dot">·</span>
        <span>Remote — serving candidates globally</span>
      </div>

      {/* Copyright */}
      <div className="lp-footer-bottom">
        <span>© 2026 CV Unlocked. All rights reserved.</span>
        <div className="lp-footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      <style>{`
        .footer-link-btn {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: color 0.2s ease;
        }
        .footer-link-btn:hover {
          color: var(--primary-500);
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
