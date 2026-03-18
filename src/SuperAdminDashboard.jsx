import { useEffect } from 'react';
import { LogOut, LayoutDashboard, Database, Settings, Activity } from 'lucide-react';

function SuperAdminDashboard({ user, onLogout }) {
  useEffect(() => {
    document.title = "Dashboard | CV Unlocked Admin";
  }, []);

  return (
    <div className="sad-wrapper">
      {/* Sidebar */}
      <aside className="sad-sidebar">
        <div className="sad-sidebar-brand">
          <div className="sad-brand-icon">
            <Database size={20} />
          </div>
          <span>CV Unlocked</span>
        </div>

        <div className="sad-sidebar-nav">
          <p className="sad-nav-label">Core Control</p>
          <a href="#" className="sad-nav-item sad-nav-item--active">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <LayoutDashboard size={18} /> Dashboard
            </div>
          </a>
          <a href="#" className="sad-nav-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Activity size={18} /> System Status
            </div>
          </a>
          <a href="#" className="sad-nav-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Settings size={18} /> Global Config
            </div>
          </a>
        </div>

        <div className="sad-sidebar-footer">
          <div className="sad-role-pill">ROOT ACCESS</div>
          <button 
            onClick={onLogout}
            style={{ 
              marginTop: '1.5rem', 
              width: '100%', 
              padding: '0.6rem', 
              background: '#cf222e', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sad-main">
        <header className="sad-topbar">
          <div>
            <p className="sad-topbar-eyebrow">OVERVIEW</p>
            <h1 className="sad-topbar-title">Super Admin Dashboard</h1>
          </div>
          <div className="sad-topbar-user">
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome, <strong style={{ color: 'var(--primary-900)' }}>{user?.name || 'Developer'}</strong></span>
          </div>
        </header>

        <section className="sad-content">
          <div className="sad-placeholder">
            <div className="sad-placeholder-icon">
              <Database size={40} />
            </div>
            <h2 className="sad-placeholder-heading">SYSTEM READY</h2>
            <p className="sad-placeholder-sub">
              Logged in to CV Unlocked as <strong>{user?.email}</strong>.
              All administrator modules are now accessible.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SuperAdminDashboard;
