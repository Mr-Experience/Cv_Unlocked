import { useState, useEffect } from 'react';
import { UserCircle, X, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';

function ClientLogin({ onBack, onSignUp, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('error');

  // Set the page title
  useEffect(() => {
    document.title = "Client Login | CV Unlocked";
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
        body: JSON.stringify({ email, password, role: 'client' })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setError('Login successful! Welcome back.');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          onSuccess(data.user);
        }, 1500);
      } else {
        setError(data.message || 'Invalid client credentials.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (err) {
      setError('Connection failed. Please check if the server is running.');
      setToastType('error');
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
          {/* Client Portal Badge */}
          <div className="sa-portal-badge">
            <UserCircle size={13} className="lock-icon" style={{ color: 'var(--primary-500)' }} />
            <span className="badge-text">Client Portal</span>
          </div>

          {/* Headings */}
          <h1 className="sa-login-title-alt">Welcome Back</h1>
          <p className="sa-login-subtitle-alt">Login to your career dashboard</p>

          {/* Form Container */}
          <div className="sa-form-container">
            <form onSubmit={handleSubmit}>
              <div className="sa-group-alt">
                <label className="sa-label-alt">Email Address</label>
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
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} />
                    Logging in...
                  </>
                ) : (
                  'Sign in to account'
                )}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
              Don't have an account? <a href="#" onClick={onSignUp} style={{ color: 'var(--primary-500)', fontWeight: '600', textDecoration: 'none' }}>Sign up</a>
            </p>
          </div>
        </div>

        {/* Modern Toast Notification (Disappears in 5s) */}
        {showToast && (
          <div className={`sa-toast ${toastType === 'success' ? 'sa-toast-success' : 'sa-toast-error'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {toastType === 'success' && <CheckCircle size={16} color="#10b981" />}
              <span className="sa-toast-message">{error}</span>
            </div>
            <button className="sa-toast-close" onClick={() => setShowToast(false)}>
              <X size={14} />
            </button>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default ClientLogin;
