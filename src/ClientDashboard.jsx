import { useEffect } from 'react';
import { LogOut, User, Settings, CreditCard, MessageSquare } from 'lucide-react';

function ClientDashboard({ user, onLogout }) {
  useEffect(() => {
    document.title = "Client Dashboard | CV Unlocked";
  }, []);

  return (
    <div className="sad-wrapper" style={{ background: '#f8fafc' }}>
      {/* Sidebar (Client Style) */}
      <aside className="sad-sidebar" style={{ background: '#1e293b' }}>
        <div className="sad-sidebar-brand">
          <User size={20} style={{ color: 'var(--primary-400)' }} />
          <span>Client Portal</span>
        </div>

        <div className="sad-sidebar-nav">
          <p className="sad-nav-label">Main Menu</p>
          <a href="#" className="sad-nav-item sad-nav-item--active">
            <User size={18} /> My Profile
          </a>
          <a href="#" className="sad-nav-item">
            <CreditCard size={18} /> Billing
          </a>
          <a href="#" className="sad-nav-item">
            <MessageSquare size={18} /> Support
          </a>
        </div>

        <div className="sad-sidebar-footer">
          <button onClick={onLogout} className="sa-btn-alt" style={{ padding: '0.6rem' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sad-main">
        <header className="sad-topbar">
          <div>
            <p className="sad-topbar-eyebrow">WELCOME</p>
            <h1 className="sad-topbar-title">Hello, {user?.firstName}!</h1>
          </div>
          <div className="sad-topbar-user">
             <span style={{ color: '#64748b' }}>Account ID: <strong>#C-{user?.id}</strong></span>
          </div>
        </header>

        <section className="sad-content">
          <div className="sad-placeholder" style={{ background: '#fff' }}>
            <h2 className="sad-placeholder-heading">YOUR ACCOUNT IS ACTIVE</h2>
            <p className="sad-placeholder-sub">
              Manage your services and information from here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ClientDashboard;
