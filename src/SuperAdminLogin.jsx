import { useState, useEffect } from 'react';
import { Lock, X, Eye, EyeOff } from 'lucide-react';

function SuperAdminLogin({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Set the page title
  useEffect(() => {
    document.title = "Super Admin Login | CV Unlocked";
  }, []);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowToast(false);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'super_admin' })
      });

      const data = await response.json();

      if (data.status === 'success') {
        onLogin(data.user);
      } else {
        setError(data.message || 'Invalid super admin credentials.');
        setShowToast(true);
      }
    } catch (err) {
      setError('Connection failed. Please check if the server is running.');
      setShowToast(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-login-background">
      {/* Navbar with brand logo */}
      <nav className="sa-navbar-top">
        <div className="sa-logo-brand" onClick={onBack}>
          <span className="logo-cv">CV</span>
          <span className="logo-unlocked">Unlocked</span>
        </div>
      </nav>

      <main className="sa-login-main-container">
        {/* White Login Card for the form group */}
        <div className="sa-form-card">
          {/* Admin Portal Badge */}
          <div className="sa-portal-badge">
            <Lock size={13} className="lock-icon" fill="#ffca28" strokeWidth={3} />
            <span className="badge-text">Admin Portal</span>
          </div>

          {/* Headings */}
          <h1 className="sa-login-title-alt">Administrator Login</h1>
          <p className="sa-login-subtitle-alt">Secure access to system management</p>

          {/* Form Container */}
          <div className="sa-form-container">
            <form onSubmit={handleSubmit}>
              <div className="sa-group-alt">
                <label className="sa-label-alt">Admin Email</label>
                <input 
                  type="email" 
                  className="sa-input-alt" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=""
                />
              </div>

              <div className="sa-group-alt">
                <label className="sa-label-alt">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="sa-input-alt" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=""
                    style={{ paddingRight: '48px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#94a3b8'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="sa-footer-alt">
                <a href="#" className="sa-link-alt" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="sa-btn-alt" disabled={loading}>
                {loading ? 'Verifying...' : 'Access Admin Dashboard'}
              </button>
            </form>
          </div>
        </div>

        {/* Modern Toast Notification (Disappears in 5s) */}
        {showToast && (
          <div className="sa-toast">
            <span className="sa-toast-message">{error}</span>
            <button className="sa-toast-close" onClick={() => setShowToast(false)}>
              <X size={14} />
            </button>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default SuperAdminLogin;
