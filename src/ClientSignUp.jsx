import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';

function ClientSignUp({ onBack, onLogin, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('error'); // 'error' or 'success'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Create Account | CV Unlocked";
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
      setToastType('error');
      setShowToast(true);
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms & Conditions');
      setToastType('error');
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
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status === 'success') {
        setError('Account successfully created! Logging you in...');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(data.message || 'Signup failed');
        setToastType('error');
        setShowToast(true);
      }
    } catch (err) {
      setError('Connection failed. Please check if the server is running.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-login-background">
      {/* Navbar with brand logo */}
      <nav className="sa-navbar-top">
        <div className="sa-logo-brand" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-cv">CV</span>
          <span className="logo-unlocked">Unlocked</span>
        </div>
      </nav>

      <main className="sa-login-main-container">
        <div className="sa-form-card sa-signup-card-extended">
          <h1 className="sa-login-title-alt" style={{ marginBottom: '0.25rem' }}>Create Account</h1>
          <p className="sa-login-subtitle-alt" style={{ marginBottom: '1.5rem' }}>Join CV Unlocked Today</p>

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
                />
              </div>
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="sa-input-alt" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                className="sa-input-alt" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sa-group-alt">
              <label className="sa-label-alt">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="sa-input-alt" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••••"
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

            <div className="sa-group-alt">
              <label className="sa-label-alt">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  className="sa-input-alt" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••••"
                  style={{ paddingRight: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="sa-signup-terms" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
              <input 
                type="checkbox" 
                name="agreeTerms" 
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-500)' }}
              />
              <label htmlFor="agreeTerms" style={{ fontSize: '0.9rem', color: '#64748b', cursor: 'pointer' }}>
                I agree with Terms & Condition
              </label>
            </div>

            <button type="submit" className="sa-btn-alt" disabled={loading || !formData.agreeTerms}>
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
            Already have an account? <a href="#" onClick={onLogin} style={{ color: 'var(--primary-500)', fontWeight: '600', textDecoration: 'none' }}>Sign In</a>
          </p>

          {/* Client Portal Pill Footer */}

        </div>

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

export default ClientSignUp;
