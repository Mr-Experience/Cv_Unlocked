import { useState, useEffect } from 'react';
import { Lock, X } from 'lucide-react';

function AdminSignUp({ onBack, onLogin, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    acceptResponsibility: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    document.title = "Create Admin Account | CV Unlocked";
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setShowToast(true);
      return;
    }
    if (!formData.acceptResponsibility) {
      setError('You must accept responsibility for admin actions');
      setShowToast(true);
      return;
    }

    setLoading(true);
    setError('');
    setShowToast(false);

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userRole: 'admin' })
      });
      const data = await response.json();

      if (data.status === 'success') {
        onSuccess();
      } else {
        setError(data.message || 'Signup failed');
        setShowToast(true);
      }
    } catch (err) {
      setError('Connection failed. Please check if the server is running.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-login-background">
      <nav className="sa-navbar-top">
        <div className="sa-logo-brand" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-cv">CV</span>
          <span className="logo-unlocked">Unlocked</span>
        </div>
      </nav>

      <main className="sa-login-main-container">
        <div className="sa-form-card sa-signup-card-extended">
          {/* Logo at top of card per screenshot */}
          <div className="sa-logo-brand" style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>
            <span className="logo-cv">CV</span>
            <span className="logo-unlocked">Unlocked</span>
          </div>

          <div className="sa-portal-badge">
            <Lock size={13} className="lock-icon" fill="#ffca28" strokeWidth={3} />
            <span className="badge-text">Admin Portal</span>
          </div>

          <h1 className="sa-login-title-alt" style={{ marginBottom: '0.25rem' }}>Create Admin Account</h1>
          <p className="sa-login-subtitle-alt" style={{ marginBottom: '2rem' }}>
            Setup requires authorization from super admin
          </p>

          <form className="sa-form-container" onSubmit={handleSubmit}>
            <div className="sa-signup-row">
              <div className="sa-group-alt">
                <label className="sa-label-alt">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  className="sa-input-alt" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
              </div>
              <div className="sa-group-alt">
                <label className="sa-label-alt">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  className="sa-input-alt" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Admin Email</label>
              <input 
                type="email" 
                name="email"
                className="sa-input-alt" 
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@cvunlocked.com"
              />
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Admin Role</label>
              <select 
                name="role"
                className="sa-input-alt"
                value={formData.role}
                onChange={handleChange}
                required
                style={{ appearance: 'auto' }}
              >
                <option value="" disabled>Choose an option...</option>
                <option value="manager">Operations Manager</option>
                <option value="moderator">Content Moderator</option>
                <option value="support">Senior Support</option>
              </select>
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Create Password</label>
              <input 
                type="password" 
                name="password"
                className="sa-input-alt" 
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="sa-input-alt" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', marginTop: '1rem' }}>
              <input 
                type="checkbox" 
                name="acceptResponsibility" 
                id="acceptResponsibility"
                checked={formData.acceptResponsibility}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-500)' }}
              />
              <label htmlFor="acceptResponsibility" style={{ fontSize: '0.9rem', color: '#64748b', cursor: 'pointer' }}>
                I accept full responsibility for admin actions
              </label>
            </div>

            <button type="submit" className="sa-btn-alt" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
            Already have an account? <a href="#" onClick={onLogin} style={{ color: 'var(--primary-500)', fontWeight: '600', textDecoration: 'none' }}>Sign In</a>
          </p>
        </div>

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

export default AdminSignUp;
