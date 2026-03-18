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
import LandingPage from './LandingPage';
import './App.css';



// Function to handle redirection logic inside the Router
function AppRoutes({ user, handleLoginSuccess, handleLogout }) {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={
        <LandingPage 
          onLogin={() => navigate('/login')} 
          onSignUp={() => navigate('/signup')} 
          onSuperAdminLogin={() => navigate('/admin/login')}
          onAdminLogin={() => navigate('/admin/portal-login')}
          onAssociateLogin={() => navigate('/associate/login')}
        />
      } />
      
      {/* Admin Portal (Standard) */}
      <Route 
        path="/admin/portal-login" 
        element={<AdminLogin onLogin={(u) => { handleLoginSuccess(u); navigate('/dashboard'); }} onBack={() => navigate('/')} onSignUp={() => navigate('/admin/signup')} />} 
      />
      <Route 
        path="/admin/signup" 
        element={<AdminSignUp onBack={() => navigate('/')} onLogin={() => navigate('/admin/portal-login')} onSuccess={() => navigate('/admin/portal-login')} />} 
      />

      {/* Super Admin Routes */}
      <Route 
        path="/admin/login" 
        element={<SuperAdminLogin onLogin={(u) => { handleLoginSuccess(u); navigate('/admin/dashboard'); }} onBack={() => navigate('/')} />} 
      />
      <Route 
        path="/admin/dashboard" 
        element={user?.role === 'super_admin' ? <SuperAdminDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} /> : <Navigate to="/admin/login" />} 
      />

      {/* Associate Portal Routes */}
      <Route 
        path="/associate/login" 
        element={<AssociateLogin onLogin={(u) => { handleLoginSuccess(u); navigate('/dashboard'); }} onBack={() => navigate('/')} onSignUp={() => navigate('/associate/signup')} />} 
      />
      <Route 
        path="/associate/signup" 
        element={<AssociateSignUp onBack={() => navigate('/')} onLogin={() => navigate('/associate/login')} onSuccess={() => navigate('/associate/login')} />} 
      />

      {/* Client Routes */}
      <Route 
        path="/signup" 
        element={<ClientSignUp onBack={() => navigate('/')} onLogin={() => navigate('/login')} onSuccess={() => navigate('/login')} />} 
      />
      <Route 
        path="/login" 
        element={<ClientLogin onBack={() => navigate('/')} onSignUp={() => navigate('/signup')} onSuccess={(u) => { handleLoginSuccess(u); navigate('/dashboard'); }} />} 
      />
      <Route 
        path="/dashboard" 
        element={user && user.role !== 'super_admin' ? <ClientDashboard user={user} onLogout={() => { handleLogout(); navigate('/'); }} /> : <Navigate to="/login" />} 
      />

      {/* Fallback */}
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
