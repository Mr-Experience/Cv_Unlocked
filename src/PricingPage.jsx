import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Pricing from './Pricing';

const PricingPage = ({ onLogin, onSignUp, onSuperAdminLogin, onAdminLogin, onAssociateLogin }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lp-wrapper">
      <Navbar onLogin={onLogin} onSignUp={onSignUp} activePage="pricing" />
      
      <main style={{ marginTop: '80px' }}>
        <header className="lp-hero" style={{ paddingBottom: '2rem' }}>
          <div className="lp-hero-top">
            <h1 className="lp-hero-title">Flexible Pricing Plans</h1>
            <p className="lp-hero-subtitle">
              Choose the right plan to accelerate your career success. No hidden fees, just results.
            </p>
          </div>
        </header>

        <Pricing onSignUp={onSignUp} />
        
        {/* Simple Section to fill the page */}
        <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.5rem' }}>Still have questions?</h2>
            <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              Our career experts are ready to help you pick the perfect plan for your specific goals. Reach out anytime.
            </p>
            <button className="lp-btn-signup-solid" onClick={() => window.location.href = 'mailto:hello@cvunlocked.com'}>
              Contact Sales
            </button>
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

export default PricingPage;
