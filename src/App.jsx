import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SuperAdminLogin from './SuperAdminLogin';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminLogin from './AdminLogin';
import AdminSignUp from './AdminSignUp';
import AssociateLogin from './AssociateLogin';
import AssociateSignUp from './AssociateSignUp';
import ClientSignUp from './ClientSignUp';
import ClientLogin from './ClientLogin';
import ClientDashboard from './ClientDashboard';
import AssociateDashboard from './AssociateDashboard';
import AdminDashboard from './AdminDashboard';
import LandingPage from './LandingPage';
import PricingPage from './PricingPage';
import ContactPage from './ContactPage';
import TeamPage from './TeamPage';
import FindJobPage from './FindJobPage';
import PartnerPage from './PartnerPage';
import './App.css';

// Function to handle redirection logic inside the Router
function AppRoutes({ user, handleLoginSuccess, handleLogout }) {
  const navigate = useNavigate();

  const DashboardSelector = () => {
    if (!user) return <Navigate to="/login" />;
    
    switch(user.role) {
      case 'super_admin': return <Navigate to="/admin/dashboard" />;
      case 'associate': return <AssociateDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} />;
      case 'admin': return <AdminDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} />;
      default: return <ClientDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} />;
    }
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={
        <LandingPage 
          onLogin={() => navigate('/login')} 
          onSignUp={() => navigate('/signup')} 
          onSuperAdminLogin={() => navigate('/super-admin/login')}
          onAdminLogin={() => navigate('/admin/login')}
          onAssociateLogin={() => navigate('/associate/login')}
        />
      } />
      
      <Route path="/pricing" element={
        <PricingPage 
          onLogin={() => navigate('/login')} 
          onSignUp={() => navigate('/signup')} 
          onSuperAdminLogin={() => navigate('/super-admin/login')}
          onAdminLogin={() => navigate('/admin/login')}
          onAssociateLogin={() => navigate('/associate/login')}
        />
      } />
      
      <Route path="/contact" element={
        <ContactPage 
          onLogin={() => navigate('/login')} 
          onSignUp={() => navigate('/signup')} 
          onSuperAdminLogin={() => navigate('/super-admin/login')}
          onAdminLogin={() => navigate('/admin/login')}
          onAssociateLogin={() => navigate('/associate/login')}
        />
      } />

      <Route path="/team" element={
        <TeamPage 
          onLogin={() => navigate('/login')} 
          onSignUp={() => navigate('/signup')} 
          onSuperAdminLogin={() => navigate('/super-admin/login')}
          onAdminLogin={() => navigate('/admin/login')}
          onAssociateLogin={() => navigate('/associate/login')}
        />
      } />

      <Route path="/find-job" element={
        <FindJobPage 
          onLogin={() => navigate('/login')} 
          onSignUp={() => navigate('/signup')} 
          onSuperAdminLogin={() => navigate('/super-admin/login')}
          onAdminLogin={() => navigate('/admin/login')}
          onAssociateLogin={() => navigate('/associate/login')}
        />
      } />

      <Route path="/partner" element={<PartnerPage />} />
      
      {/* Standard Admin Portal */}
      <Route 
        path="/admin/login" 
        element={<AdminLogin onLogin={(u) => { handleLoginSuccess(u); navigate('/admin/portal'); }} onBack={() => navigate('/')} onSignUp={() => navigate('/admin/signup')} />} 
      />
      <Route 
        path="/admin/signup" 
        element={<AdminSignUp onBack={() => navigate('/')} onLogin={() => navigate('/admin/login')} onSuccess={() => navigate('/admin/login')} />} 
      />
      <Route 
        path="/admin/portal" 
        element={user?.role === 'admin' ? <AdminDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} /> : <Navigate to="/admin/login" />} 
      />

      {/* Super Admin Portal */}
      <Route 
        path="/super-admin/login" 
        element={<SuperAdminLogin onLogin={(u) => { handleLoginSuccess(u); navigate('/super-admin/portal'); }} onBack={() => navigate('/')} />} 
      />
      <Route 
        path="/super-admin/portal" 
        element={user?.role === 'super_admin' ? <SuperAdminDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} /> : <Navigate to="/super-admin/login" />} 
      />

      {/* Associate Portal */}
      <Route 
        path="/associate/login" 
        element={<AssociateLogin onLogin={(u) => { handleLoginSuccess(u); navigate('/associate/portal'); }} onBack={() => navigate('/')} onSignUp={() => navigate('/associate/signup')} />} 
      />
      <Route 
        path="/associate/signup" 
        element={<AssociateSignUp onBack={() => navigate('/')} onLogin={() => navigate('/associate/login')} onSuccess={() => navigate('/associate/login')} />} 
      />
      <Route 
        path="/associate/portal" 
        element={user?.role === 'associate' ? <AssociateDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} /> : <Navigate to="/associate/login" />} 
      />

      {/* Client Portal */}
      <Route 
        path="/signup" 
        element={<ClientSignUp onBack={() => navigate('/')} onLogin={() => navigate('/signup')} onSuccess={() => navigate('/login')} />} 
      />
      <Route 
        path="/login" 
        element={<ClientLogin onBack={() => navigate('/')} onSignUp={() => navigate('/signup')} onSuccess={(u) => { handleLoginSuccess(u); navigate('/client/portal'); }} />} 
      />
      <Route 
        path="/client/portal" 
        element={user?.role === 'client' || !user?.role ? <ClientDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} /> : <Navigate to="/login" />} 
      />

      {/* Fallback & Legacy Redirects */}
      <Route path="/dashboard" element={
        user?.role === 'admin' ? <Navigate to="/admin/portal" /> :
        user?.role === 'associate' ? <Navigate to="/associate/portal" /> :
        user?.role === 'super_admin' ? <Navigate to="/super-admin/portal" /> :
        <Navigate to="/client/portal" />
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <AppRoutes user={user} handleLoginSuccess={handleLoginSuccess} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;
