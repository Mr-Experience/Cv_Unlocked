import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  Megaphone, Pen, DollarSign, Camera, FileEdit, Music, Users, Code, HeartPulse,
  Briefcase, GraduationCap, Truck, Globe, ShoppingBag, Wrench, Landmark, Tv,
  FlaskConical, Plane, BookOpen, ChevronRight
} from 'lucide-react';

const allCategories = [
  { icon: <Megaphone size={24} />, name: 'Digital Marketing', jobs: 143 },
  { icon: <Pen size={24} />, name: 'Art & Design', jobs: 110 },
  { icon: <DollarSign size={24} />, name: 'Accounting', jobs: 158 },
  { icon: <Camera size={24} />, name: 'Photography', jobs: 95 },
  { icon: <FileEdit size={24} />, name: 'Copy Writing', jobs: 143 },
  { icon: <Music size={24} />, name: 'Music', jobs: 143 },
  { icon: <Users size={24} />, name: 'Human Resources', jobs: 143 },
  { icon: <Code size={24} />, name: 'Software Engineering', jobs: 267 },
  { icon: <HeartPulse size={24} />, name: 'Healthcare', jobs: 89 },
  { icon: <Briefcase size={24} />, name: 'Business Development', jobs: 74 },
  { icon: <GraduationCap size={24} />, name: 'Education', jobs: 201 },
  { icon: <Truck size={24} />, name: 'Logistics', jobs: 56 },
  { icon: <Globe size={24} />, name: 'International Relations', jobs: 38 },
  { icon: <ShoppingBag size={24} />, name: 'Retail & Sales', jobs: 184 },
  { icon: <Wrench size={24} />, name: 'Engineering', jobs: 122 },
  { icon: <Landmark size={24} />, name: 'Finance & Banking', jobs: 93 },
  { icon: <Tv size={24} />, name: 'Media & Broadcasting', jobs: 47 },
  { icon: <FlaskConical size={24} />, name: 'Research & Science', jobs: 61 },
  { icon: <Plane size={24} />, name: 'Travel & Tourism', jobs: 72 },
  { icon: <BookOpen size={24} />, name: 'Legal & Compliance', jobs: 49 },
];

const FindJobPage = ({ onLogin, onSignUp, onSuperAdminLogin, onAdminLogin, onAssociateLogin }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lp-wrapper">
      <Navbar onLogin={onLogin} onSignUp={onSignUp} activePage="find-job" />

      <main style={{ marginTop: '80px' }}>

        {/* ── Page Header ── */}
        <section className="fj-page-header">
          <div className="fj-inner">
            <h1 className="fj-page-title">Browse <span className="fj-orange">Job Categories</span></h1>
            <p className="fj-page-sub">Choose a category and let your dedicated associate apply on your behalf — every single day.</p>
          </div>
        </section>

        {/* ── Categories Grid ── */}
        <section className="fj-categories-section">
          <div className="fj-inner">
            <div className="fj-cat-grid">
              {allCategories.map((cat, i) => (
                <div key={i} className="fj-cat-card">
                  <div className="fj-cat-icon">{cat.icon}</div>
                  <h4 className="fj-cat-name">{cat.name}</h4>
                  <div className="fj-cat-footer">
                    <span className="fj-cat-jobs">{cat.jobs} Jobs Opened</span>
                    <ChevronRight size={16} className="fj-cat-arrow" />
                  </div>
                  <button className="fj-cat-apply-btn" onClick={onSignUp}>
                    Apply Now
                  </button>
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

export default FindJobPage;
