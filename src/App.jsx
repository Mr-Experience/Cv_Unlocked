import { ShieldAlert, ShieldCheck, Users, UserCircle } from 'lucide-react';

function App() {
  const portals = [
    {
      title: 'Super Admin Portal',
      description: 'System-wide management, configuration, and security controls.',
      icon: <ShieldAlert size={32} />,
      iconClass: 'icon-super-admin',
      link: '/super-admin'
    },
    {
      title: 'Admin Portal',
      description: 'Organization management, user oversight, and reporting.',
      icon: <ShieldCheck size={32} />,
      iconClass: 'icon-admin',
      link: '/admin'
    },
    {
      title: 'Associate Portal',
      description: 'Daily operations, task management, and team collaboration.',
      icon: <Users size={32} />,
      iconClass: 'icon-associate',
      link: '/associate'
    },
    {
      title: 'Customer Portal',
      description: 'Direct engagement, support, and account management.',
      icon: <UserCircle size={32} />,
      iconClass: 'icon-customer',
      link: '/customer'
    }
  ];

  return (
    <div className="container">
      <header className="hero-section">
        <div className="hero-badge">Gateway Access</div>
        <h1 className="hero-title">CV Unlocked Platform</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Welcome back. Please select the portal you wish to access.
        </p>
      </header>

      <main className="gateway-grid">
        {portals.map((portal, index) => (
          <a key={index} href={portal.link} className="gateway-card" onClick={(e) => e.preventDefault()}>
            <div className={`gateway-icon ${portal.iconClass}`}>
              {portal.icon}
            </div>
            <h2 className="gateway-title">{portal.title}</h2>
            <p className="gateway-description">
              {portal.description}
            </p>
            <div style={{ 
              marginTop: 'auto', 
              color: 'var(--primary-500)', 
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Access Portal →
            </div>
          </a>
        ))}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '4rem 0',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '4rem',
        color: 'var(--text-muted)',
        fontSize: '0.875rem'
      }}>
        © 2026 CV Unlocked. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
