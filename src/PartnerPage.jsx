import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, Globe, CheckCircle, Loader2, ChevronDown } from 'lucide-react';

const PartnerPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    partnerType: '',
    teamSize: '',
    message: '',
    agreeTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Become a Partner | CV Unlocked';
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="pp-wrapper">
      {/* Simple Navbar */}
      <nav className="pp-nav">
        <div className="pp-nav-inner">
          <div className="pp-nav-left">
            <a href="/" className="pp-back-link">← Back</a>
            <div className="pp-logo">
              <span className="logo-cv">CV</span>
              <span className="logo-unlocked">Unlocked</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pp-main">
        <div className="pp-form-inner">

          {/* Page Title */}
          <div className="pp-page-heading">
            <h1>Partner Application</h1>
            <p>Fill in the form below and our partnerships team will get back to you within 2 business days.</p>
          </div>

          {submitted ? (
            <div className="pp-success-card">
              <div className="pp-success-icon"><CheckCircle size={48} /></div>
              <h2>Application Received!</h2>
              <p>Thank you for your interest in partnering with CV Unlocked. We'll be in touch shortly.</p>
              <a href="/" className="pp-success-home-btn">Back to Home</a>
            </div>
          ) : (
            <div className="pp-form-card">
              <form className="pp-form" onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="pp-form-row">
                  <div className="pp-form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="pp-form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="pp-form-row">
                  <div className="pp-form-group">
                    <label>Business Email *</label>
                    <input type="email" name="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="pp-form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" placeholder="+44 20 1234 5678" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="pp-form-row">
                  <div className="pp-form-group">
                    <label>Company Name *</label>
                    <input type="text" name="company" placeholder="Your Company Ltd." value={formData.company} onChange={handleChange} required />
                  </div>
                  <div className="pp-form-group">
                    <label>Company Website</label>
                    <input type="url" name="website" placeholder="https://yourcompany.com" value={formData.website} onChange={handleChange} />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="pp-form-row">
                  <div className="pp-form-group">
                    <label>Partnership Type *</label>
                    <div className="pp-select-wrapper">
                      <select name="partnerType" value={formData.partnerType} onChange={handleChange} required>
                        <option value="" disabled>Select type...</option>
                        <option value="recruiter">Recruitment Agency</option>
                        <option value="staffing">Staffing Company</option>
                        <option value="coach">Career Coach</option>
                        <option value="employer">Employer / Company</option>
                        <option value="training">Training Provider</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={16} className="pp-select-icon" />
                    </div>
                  </div>
                  <div className="pp-form-group">
                    <label>Team Size *</label>
                    <div className="pp-select-wrapper">
                      <select name="teamSize" value={formData.teamSize} onChange={handleChange} required>
                        <option value="" disabled>Select size...</option>
                        <option value="1-5">1–5 people</option>
                        <option value="6-20">6–20 people</option>
                        <option value="21-100">21–100 people</option>
                        <option value="100+">100+ people</option>
                      </select>
                      <ChevronDown size={16} className="pp-select-icon" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="pp-form-group">
                  <label>Tell us about your business *</label>
                  <textarea name="message" rows="5" placeholder="Briefly describe what you do and how you'd like to partner with CV Unlocked..." value={formData.message} onChange={handleChange} required />
                </div>

                {/* Terms */}
                <div className="pp-terms-row">
                  <input type="checkbox" name="agreeTerms" id="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="/">Terms & Conditions</a> and consent to CV Unlocked contacting me about my application.
                  </label>
                </div>

                <button type="submit" className="pp-submit-btn" disabled={loading || !formData.agreeTerms}>
                  {loading ? (
                    <><Loader2 size={18} className="pp-spin" /> Submitting...</>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="pp-footer">
        <p>© {new Date().getFullYear()} CV Unlocked. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PartnerPage;
