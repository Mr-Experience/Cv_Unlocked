import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TeamPage = ({ onLogin, onSignUp, onSuperAdminLogin, onAdminLogin, onAssociateLogin }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const members = [
    {
      name: "Julie Collins",
      role: "Senior HR Expert",
      bio: "With over 10 years in executive recruitment, Julie ensures your CV hits the mark for high-tier corporate roles.",
    },
    {
      name: "Steve Ayoboe",
      role: "Strategy Specialist",
      bio: "Steve specializes in tailoring application strategies for competitive tech and finance markets globally.",
    },
    {
      name: "Dominika Snyder",
      role: "Career Coach",
      bio: "Dominika focuses on interview preparation and personalized career pathing for our premium clients.",
    }
  ];

  return (
    <div className="lp-wrapper">
      <Navbar onLogin={onLogin} onSignUp={onSignUp} activePage="team" />
      
      <main style={{ marginTop: '80px' }}>
        {/* Intro Section */}
        <section className="team-intro-section">
          <div className="team-container">
            <div className="team-intro-layout">
              <div className="team-intro-content">
                <h1 className="team-section-title">
                  Your Path to <span className="highlight-text">Career Mastery</span>
                </h1>
                <div className="team-subtitle-line">
                  <span>Professional Career Associates</span>
                </div>
                <p className="team-intro-text">
                  CV Unlocked started with a simple belief: the best talent shouldn't stay hidden behind a poorly optimized search process. We pride ourselves on our exceptionally trained and experienced associates who can help you land your dream role in a safe and supportive environment.
                </p>
                <p className="team-intro-text">
                  We started a <span className="highlight-inline">tradition</span> of excellence since day one. Our belief is that while career growth isn't always easy, with the right team behind you, anyone can unlock their full potential.
                </p>
              </div>
              <div className="team-intro-visual">
                <div className="gray-placeholder-img"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="team-members-section">
          <div className="team-container">
            <h2 className="team-members-title">
              Team <span className="highlight-text">Members</span>
            </h2>
            <div className="team-subtitle-line team-subtitle-line-light">
              <span>Professional Associates</span>
            </div>

            <div className="team-grid">
              {members.map((member, idx) => (
                <div key={idx} className="team-card">
                  <div className="team-card-visual">
                    <div className="gray-placeholder-img"></div>
                  </div>
                  <div className="team-card-info">
                    <h3>{member.name}</h3>
                    <span className="team-role">{member.role}</span>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
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

export default TeamPage;
