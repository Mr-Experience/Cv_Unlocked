import React, { useState, useEffect } from 'react';
import { Quote, UserPlus, CreditCard, UserCheck, BellRing, ChevronDown, BarChart2, Smartphone, ClipboardCheck, Lock } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

function LandingPage({ onLogin, onSignUp, onSuperAdminLogin, onAdminLogin, onAssociateLogin }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How many jobs do you apply to on my behalf?",
      a: "We send out 6 targeted applications every single day — that's 180+ a month. Each one is tailored to your profile, not mass-blasted."
    },
    {
      q: "Do I need to do anything after signing up?",
      a: "Just share your CV, target roles, and preferences. Your assigned associate handles everything from there. You'll only need to show up when there's an interview."
    },
    {
      q: "Who is my associate and can I trust them?",
      a: "Every associate is a vetted, trained professional on our team. They're not bots. They review your profile, apply smartly, and keep you updated throughout."
    },
    {
      q: "How soon can I expect interview calls?",
      a: "Most clients start seeing responses within 1–2 weeks. 92% land an interview within the first 4 weeks of being active on the platform."
    },
    {
      q: "Can I pause or cancel my plan anytime?",
      a: "Yes, absolutely. You're never locked in. You can pause, switch plans, or cancel from your dashboard at any time with no hidden fees."
    },
  ];

  const testimonials = [
    { text: "CV Unlocked transformed my job search. 6 applications a day really works!", author: "Sarah J., Product Designer" },
    { text: "The easiest way to land a job abroad. They handle the hard work while I prep.", author: "Michael T., Software Engineer" },
    { text: "Finally, a service that understands manual application burnout. Life-changing!", author: "Elena R., Marketing Head" },
    { text: "Got a senior offer in just 3 weeks. Their consistency is unmatched.", author: "David W., Data Scientist" },
    { text: "Professional, reliable, and incredibly fast. My career is on the right track.", author: "Anita K., HR Manager" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lp-wrapper">
      <Navbar onLogin={onLogin} onSignUp={onSignUp} activePage="home" />

      {/* ── Hero Section ── */}
      {/* ── Hero Section (Winged Arrangement) ── */}
      <header className="lp-hero">
        <div className="lp-hero-top">
          <h1 className="lp-hero-title">
            We Find Jobs For You —<br />Every Single Day.
          </h1>
          <p className="lp-hero-subtitle">
            While you sleep, prep, or go about your day — we're sending out 6 job applications on your behalf.
          </p>
        </div>

        <div className="lp-hero-main-layout">
          {/* Left Wing */}
          <div className="lp-hero-column lp-hero-left">
            <h3 className="lp-hero-column-title">Global Career Success</h3>
            <p className="lp-hero-column-desc">
              Join the ultimate career adventure: daily submissions, tailored strategies, and interview coaching for every candidate.
            </p>
            <div className="lp-hero-social-proof">
              <div className="lp-mini-avatar-stack">
                <img src="https://i.pravatar.cc/100?img=33" alt="Client 1" />
                <img src="https://i.pravatar.cc/100?img=34" alt="Client 2" />
                <img src="https://i.pravatar.cc/100?img=35" alt="Client 3" />
                <div className="lp-mini-avatar-plus">+</div>
              </div>
              <button className="lp-get-started-inline" onClick={onSignUp}>
                Get Started <span className="lp-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Center Image */}
          <div className="lp-hero-center-visual">
            <img 
              src="/hero_professional_worker_1773795979879.png" 
              alt="Successful Professional Working" 
              className="lp-hero-img-main" 
            />
          </div>

          {/* Right Wing */}
          <div className="lp-hero-column lp-hero-right">
            <div className="lp-hero-quote-container">
              <Quote className="lp-hero-quote-icon" size={24} />
              <div key={currentQuote} className="lp-hero-quote-box">
                <p className="lp-hero-quote-text">"{testimonials[currentQuote].text}"</p>
                <div className="lp-hero-quote-author">— {testimonials[currentQuote].author}</div>
              </div>
              
              <div className="lp-quote-indicators">
                {testimonials.map((_, i) => (
                  <div 
                    key={i} 
                    className={`lp-quote-dot ${i === currentQuote ? 'active' : ''}`}
                    onClick={() => setCurrentQuote(i)}
                  />
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* ── Social Proof Bar ── */}
      <section className="lp-social-proof-bar">
        <div className="lp-sp-item">
          <span className="lp-sp-number">12k+</span>
          <span className="lp-sp-label">Jobs Applications Sent</span>
        </div>
        <div className="lp-sp-item">
          <span className="lp-sp-number">1k+</span>
          <span className="lp-sp-label">Active Users & Growing</span>
        </div>
        <div className="lp-sp-item">
          <span className="lp-sp-number">92%</span>
          <span className="lp-sp-label">Interview Rate in 4 Weeks</span>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="lp-hiw-section" id="how-it-works">
        <div className="lp-hiw-header">
          <div className="lp-hiw-header-left">
            <span className="lp-hiw-label">How it works</span>
            <h2 className="lp-hiw-title">Getting a job today has never been this easy.</h2>
          </div>
          <p className="lp-hiw-header-right">
            No stress, no spreadsheets. You give us what we need and we take it from there — applying daily, tracking responses, and keeping you ready when it matters.
          </p>
        </div>

        <div className="lp-hiw-cards">
          <div className="lp-hiw-card">
            <div className="lp-hiw-num">01</div>
            <div className="lp-hiw-icon"><UserPlus size={22} /></div>
            <h3>Create Your Account</h3>
            <p>Sign up in under two minutes. Tell us your target roles, location preferences, and what kind of companies excite you.</p>
          </div>

          <div className="lp-hiw-card">
            <div className="lp-hiw-num">02</div>
            <div className="lp-hiw-icon"><CreditCard size={22} /></div>
            <h3>Pick a Plan</h3>
            <p>Choose a subscription that fits your pace. Every plan gets you a dedicated associate — not a bot, a real person on your team.</p>
          </div>

          <div className="lp-hiw-card">
            <div className="lp-hiw-num">03</div>
            <div className="lp-hiw-icon"><UserCheck size={22} /></div>
            <h3>Meet Your Associate</h3>
            <p>Your assigned associate reviews your profile, tailors your applications, and sends out 6 every single day on your behalf.</p>
          </div>

          <div className="lp-hiw-card">
            <div className="lp-hiw-num">04</div>
            <div className="lp-hiw-icon"><BellRing size={22} /></div>
            <h3>Get Updates & Interviews</h3>
            <p>We track responses and notify you the moment something moves. When an interview is lined up, we tell you exactly how to prep.</p>
          </div>
        </div>
      </section>

      {/* ── Become a Partner ── */}
      <section className="lp-partner-section">
        <div className="lp-partner-inner">
          <div className="lp-partner-left">
            <span className="lp-partner-label">Partnership</span>
            <h2 className="lp-partner-title">Grow with us — become a CV Unlocked partner.</h2>
            <p className="lp-partner-desc">
              Whether you're a recruiter, staffing agency, or career coach — partnering with us puts your network to work. We bring the candidates, you bring the opportunity. Together we close more offers, faster.
            </p>
            <button className="lp-partner-btn" onClick={() => window.location.href = '/partner'}>
              Become a Partner <span>→</span>
            </button>
          </div>

          <div className="lp-partner-right">
            <img src="/partnership_image.jpg" alt="Partnership Team" className="lp-partner-img" />
          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ── */}
      <section className="lp-apart-section">
        <div className="lp-apart-header">
          <h2 className="lp-apart-title">Core features that set us apart from the competition</h2>
          <p className="lp-apart-sub">We don't just submit CVs — we manage your entire job search so you can focus on showing up and closing offers.</p>
        </div>

        <div className="lp-apart-grid">
          {/* Left cards */}
          <div className="lp-apart-col">
            <div className="lp-apart-card">
              <div className="lp-apart-icon"><BarChart2 size={20} /></div>
              <div>
                <h4>Real-time tracking</h4>
                <p>See every application your associate sends, the status, and any responses — all in one live dashboard.</p>
              </div>
            </div>
            <div className="lp-apart-card">
              <div className="lp-apart-icon"><ClipboardCheck size={20} /></div>
              <div>
                <h4>Tailored applications</h4>
                <p>Every job application is customised to match the role — no generic submissions, ever.</p>
              </div>
            </div>
          </div>

          {/* Center image */}
          <div className="lp-apart-center">
            <img src="/core_features_lady.jpg" alt="Personalized Career Support" className="lp-apart-img" />
          </div>

          {/* Right cards */}
          <div className="lp-apart-col">
            <div className="lp-apart-card">
              <div className="lp-apart-icon"><Smartphone size={20} /></div>
              <div>
                <h4>Always reachable</h4>
                <p>Your associate keeps you in the loop via your dashboard — no chasing, no silence.</p>
              </div>
            </div>
            <div className="lp-apart-card">
              <div className="lp-apart-icon"><Lock size={20} /></div>
              <div>
                <h4>Secure & private</h4>
                <p>Your personal information and job history stay protected with end-to-end privacy by design.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="lp-stories-section">
        <div className="lp-stories-inner">

          {/* Left */}
          <div className="lp-stories-left">
            <span className="lp-stories-label">Testimonials</span>
            <h2 className="lp-stories-title">What our users are saying</h2>
            <p className="lp-stories-sub">Our platform has delivered consistent and measurable improvements for professionals across various industries.</p>
          </div>

          {/* Right — card grid */}
          <div className="lp-stories-grid">
            <div className="lp-story-card lp-story-card--accent">
              <div className="lp-story-quote-icon">"</div>
              <p className="lp-story-text">This platform helped me streamline my daily tasks in ways I didn't expect — offering a level of clarity and structure that fully supports my workflow every single day.</p>
              <div className="lp-story-author">
                <img src="https://i.pravatar.cc/100?img=12" alt="Jonathan Reeves" />
                <div>
                  <strong>Jonathan Reeves</strong>
                  <span>Product Designer</span>
                </div>
              </div>
            </div>

            <div className="lp-story-card">
              <div className="lp-story-quote-icon">"</div>
              <p className="lp-story-text">I appreciate how practical and thoughtfully crafted each feature is, making it easier for me to break down complex information and extract meaningful insights effectively.</p>
              <div className="lp-story-author">
                <img src="https://i.pravatar.cc/100?img=5" alt="Daniel Hart" />
                <div>
                  <strong>Daniel Hart</strong>
                  <span>UX Researcher</span>
                </div>
              </div>
            </div>

            <div className="lp-story-card">
              <div className="lp-story-quote-icon">"</div>
              <p className="lp-story-text">The system is reliable, adaptable, and easy to adopt — even for individuals who aren't familiar with similar platforms or modern tools.</p>
              <div className="lp-story-author">
                <img src="https://i.pravatar.cc/100?img=47" alt="Ethan Morales" />
                <div>
                  <strong>Ethan Morales</strong>
                  <span>Data Analyst</span>
                </div>
              </div>
            </div>

            <div className="lp-story-card lp-story-card--dark">
              <div className="lp-story-quote-icon">"</div>
              <p className="lp-story-text">Got my first interview in 9 days. My associate was on it immediately — I genuinely didn't have to lift a finger after the first chat.</p>
              <div className="lp-story-author">
                <img src="https://i.pravatar.cc/100?img=29" alt="Amara Osei" />
                <div>
                  <strong>Amara Osei</strong>
                  <span>Software Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="lp-faq-section">
        <h2 className="lp-faq-title">Frequently asked questions</h2>
        <div className="lp-faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`lp-faq-item ${openFaq === i ? 'lp-faq-item--open' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="lp-faq-row">
                <span className="lp-faq-q">{item.q}</span>
                <ChevronDown size={18} className="lp-faq-icon" />
              </div>
              {openFaq === i && <p className="lp-faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer 
        onSuperAdminLogin={onSuperAdminLogin}
        onAdminLogin={onAdminLogin}
        onAssociateLogin={onAssociateLogin}
        onLogin={onLogin}
      />
    </div>
  );
}

export default LandingPage;
