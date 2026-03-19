import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = ({ onLogin, onSignUp, onSuperAdminLogin, onAdminLogin, onAssociateLogin }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const infoItems = [
    {
      icon: <Mail size={22} />,
      title: "We're always happy to help.",
      lines: ["hello@cvunlocked.com"],
    },
    {
      icon: <Phone size={22} />,
      title: "Our Hotline Number",
      lines: ["+44 20 7123 4567", "+44 20 7987 6543"],
    },
    {
      icon: <MapPin size={22} />,
      title: "Our Address",
      lines: ["123 Career Blvd, Suite 456,", "London, EC1A 1BB, UK"],
    },
    {
      icon: <Clock size={22} />,
      title: "Our Business Hours",
      lines: ["Mon-Fri, 9:00am - 6:00pm", "Sat-Sun: Closed"],
    },
  ];

  return (
    <div className="lp-wrapper">
      <Navbar onLogin={onLogin} onSignUp={onSignUp} activePage="contact" />

      <main style={{ marginTop: '80px' }}>

        {/* ── Hero Banner ── */}
        <section className="ct-hero">
          <div className="ct-hero-inner">
            <h1 className="ct-hero-title">Get In Touch</h1>
            <p className="ct-hero-sub">We'd love to hear from you. Reach out and we'll get back to you as soon as possible.</p>
          </div>
        </section>

        {/* ── Info Cards Row ── */}
        <section className="ct-info-row">
          <div className="ct-inner">
            <div className="ct-info-grid">
              {infoItems.map((item, idx) => (
                <div key={idx} className="ct-info-card">
                  <div className="ct-info-icon">{item.icon}</div>
                  <h3 className="ct-info-title">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="ct-info-line">{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="ct-map-section">
          <iframe
            title="CV Unlocked Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.6459259782!2d-0.09798122387580536!3d51.51781221010267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b4ed5028a45%3A0x7b43f6cf3e65b45!2sEC1A%201BB%2C%20London%2C%20UK!5e0!3m2!1sen!2suk!4v1705000000000!5m2!1sen!2suk"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        {/* ── Form Section ── */}
        <section className="ct-form-section">
          <div className="ct-inner ct-inner-sm">
            <div className="ct-form-wrapper">
              <div className="ct-form-left">
                <h2 className="ct-form-heading">Questions? Feel Free to<br />Reach Out Via Message.</h2>
                <p className="ct-form-sub">Our career experts respond within 24 hours on business days. We value every message.</p>
              </div>
              <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label>Name *</label>
                    <input type="text" placeholder="Your full name" required />
                  </div>
                  <div className="ct-form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="Your email address" required />
                  </div>
                </div>
                <div className="ct-form-group">
                  <label>What's on your mind?</label>
                  <textarea rows="5" placeholder="Write your message here..."></textarea>
                </div>
                <button type="submit" className="ct-submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer
        onSuperAdminLogin={onSuperAdminLogin}
        onAdminLogin={onAdminLogin}
        onAssociateLogin={onAssociateLogin}
        onLogin={onLogin}
      />
    </div>
  );
};

export default ContactPage;
