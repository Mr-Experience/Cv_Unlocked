import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  CreditCard, 
  User, 
  LogOut,
  Edit,
  Save,
  Camera,
  Plus,
  Send,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import './ClientDashboard.css';

// SUB-COMPONENTS
const ClientOverview = () => (
  <>
    <section className="welcome-section"><h1 className="welcome-title">Welcome back,</h1><p className="welcome-subtitle">Here's your job search overview</p></section>
    <div className="stats-grid">
      <div className="stat-card active"><span className="stat-value orange">0</span><span className="stat-label">Total Application</span></div>
      <div className="stat-card"><span className="stat-value">0</span><span className="stat-label">Interviews</span></div>
      <div className="stat-card"><span className="stat-value">0</span><span className="stat-label">In Progress</span></div>
      <div className="stat-card"><span className="stat-value">0</span><span className="stat-label">Pending Response</span></div>
    </div>
    <div className="dashboard-main-columns">
      <div className="section-card"><h2 className="section-title">Recent Applications</h2><div className="placeholder-area" style={{ marginTop: '0' }}>No applications found yet.</div></div>
      <div className="sidebar-right-column">
        <div className="info-card">
          <div className="associate-profile">
            <div className="associate-avatar"><img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" /></div>
            <span className="associate-name">Client Associate</span>
            <button className="btn-message" style={{ marginTop: '16px' }}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </>
);

const ClientProfileSettings = ({ profileData, handleProfileChange, handleImageUpload, handleSaveProfile, isEditing, setIsEditing, isSaving, toast }) => (
  <div className="profile-view-container">
    <div className="profile-view-header"><h1 className="profile-title">My profile</h1>
      <div className="profile-actions">
        {!isEditing ? <button className="btn-edit" onClick={() => setIsEditing(true)}><Edit size={16} /> Edit</button> : <button className="btn-save" onClick={handleSaveProfile} disabled={isSaving}><Save size={16} /> {isSaving ? 'Saving...' : 'Save changes'}</button>}
      </div>
    </div>
    {toast.show && <div style={{ padding: '12px 24px', background: toast.type === 'success' ? '#166534' : '#991B1B', color: 'white', borderRadius: '8px', marginBottom: '24px' }}>{toast.message}</div>}
    <div className="profile-grid">
      <div className="profile-card">
        <h2 className="card-title">Personal Information</h2>
        <div className="form-row">
          <div className="input-group"><label>First Name</label><input type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange} disabled={!isEditing} className="profile-input" /></div>
          <div className="input-group"><label>Last Name</label><input type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange} disabled={!isEditing} className="profile-input" /></div>
        </div>
        <div className="form-row">
          <div className="input-group"><label>E-mail</label><input type="email" name="email" value={profileData.email} onChange={handleProfileChange} disabled={!isEditing} className="profile-input" /></div>
          <div className="input-group"><label>Phone</label><input type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} disabled={!isEditing} className="profile-input" /></div>
        </div>
      </div>
      <div className="profile-card">
        <h2 className="card-title">Profile Photo</h2>
        <div className="photo-card-content">
          <input type="file" id="pfpIn" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={!isEditing} />
          <div className="photo-display" onClick={() => isEditing && document.getElementById('pfpIn').click()} style={{ cursor: isEditing ? 'pointer' : 'default', overflow: 'hidden' }}>
            {profileData.profilePicture ? <img src={profileData.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <><Camera size={32} /><p>Click to upload</p></>}
          </div>
          <button className="btn-upload" onClick={() => document.getElementById('pfpIn').click()} disabled={!isEditing}>Upload Picture</button>
        </div>
      </div>
    </div>
    <div className="profile-card" style={{ marginTop: '24px' }}>
      <h2 className="card-title">Job Preference & Bio</h2>
      <div className="input-group" style={{ marginBottom: '16px' }}><label>Occupation</label><input type="text" name="occupation" value={profileData.occupation} onChange={handleProfileChange} disabled={!isEditing} className="profile-input" /></div>
      <div className="input-group"><label>Bio</label><textarea name="bio" value={profileData.bio} onChange={handleProfileChange} disabled={!isEditing} className="profile-input" style={{ minHeight: '100px' }} /></div>
    </div>
  </div>
);

const ClientDocumentVault = () => <div className="docs-view"><h1 className="docs-title">My Document</h1><button className="btn-upload-orange"><Plus size={16} /> Upload Document</button></div>;
const ClientJobProgress = () => <div className="apps-view"><h1 className="apps-title">Job Application</h1><div className="apps-table-container"><div className="apps-table-header"><span>Job Title</span><span>Company</span><span>Status</span></div></div></div>;
const ClientChatCenter = () => <div className="messages-view"><h1 className="profile-title">Messages</h1><div className="chat-input-wrapper"><input type="text" placeholder="Type here..." /><button className="btn-send"><Send size={16} /></button></div></div>;
const ClientSubscriptionManager = () => <div className="billing-view"><h1 className="billing-title">Subscription & Billing</h1><button className="btn-pay">Pay Now</button></div>;

// MAIN COMPONENT
function ClientDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '', phone: user?.phone || '', bio: user?.bio || '', occupation: user?.occupation || '', address: user?.address || '', city: user?.city || '', country: user?.country || '', profilePicture: user?.profilePicture || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const titles = { dashboard: "Dashboard", profile: "My Profile", documents: "Documents", applications: "Applications", messages: "Messages", billing: "Subscription" };
    document.title = `${titles[activeTab] || 'Dashboard'} | CV Unlocked`;
  }, [activeTab]);

  const handleProfileChange = (e) => { const { name, value } = e.target; setProfileData(prev => ({ ...prev, [name]: value })); };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileData(prev => ({ ...prev, profilePicture: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const resp = await fetch(`http://localhost:3001/api/users/${user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profileData) });
      if ((await resp.json()).status === 'success') { setToast({ show: true, message: 'Profile updated!', type: 'success' }); setIsEditing(false); }
    } catch (err) { setToast({ show: true, message: 'Server error', type: 'error' }); }
    finally { setIsSaving(false); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); }
  };

  const renderActiveView = () => {
    switch(activeTab) {
      case 'dashboard': return <ClientOverview />;
      case 'profile': return <ClientProfileSettings profileData={profileData} handleProfileChange={handleProfileChange} handleImageUpload={handleImageUpload} handleSaveProfile={handleSaveProfile} isEditing={isEditing} setIsEditing={setIsEditing} isSaving={isSaving} toast={toast} />;
      case 'documents': return <ClientDocumentVault />;
      case 'applications': return <ClientJobProgress />;
      case 'messages': return <ClientChatCenter />;
      case 'billing': return <ClientSubscriptionManager />;
      default: return <ClientOverview />;
    }
  };

  return (
    <div className={`client-dashboard-container ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <aside className={`client-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header"><div className="sidebar-logo"><span className="logo-main">CV<span className="logo-accent">Unlocked</span></span><span className="sidebar-portal">Client Portal</span></div></div>
        <nav className="sidebar-nav">
          <button onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}><LayoutDashboard size={18} /> Dashboard</button>
          <button onClick={() => { setActiveTab('documents'); setIsMobileMenuOpen(false); }} className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}><FileText size={18} /> My Documents</button>
          <button onClick={() => { setActiveTab('applications'); setIsMobileMenuOpen(false); }} className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}><Briefcase size={18} /> Job Applications</button>
          <button onClick={() => { setActiveTab('messages'); setIsMobileMenuOpen(false); }} className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}><MessageSquare size={18} /> Messages</button>
          <button onClick={() => { setActiveTab('billing'); setIsMobileMenuOpen(false); }} className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}><CreditCard size={18} /> Subscription</button>
          <button onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }} className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}><User size={18} /> My Profile</button>
        </nav>
        <div style={{ padding: '24px' }}><button onClick={onLogout} className="nav-item"><LogOut size={18} /> Logout</button></div>
      </aside>
      <div className="main-layout-right">
        <header className="client-header">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
          <div className="header-user-info">
            <span className="user-full-name">{profileData.firstName} {profileData.lastName}</span>
            <div className="user-profile-circle" style={{ overflow: 'hidden' }}>{profileData.profilePicture ? <img src={profileData.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={24} />}</div>
          </div>
        </header>
        <main className="main-content-wrapper">{renderActiveView()}</main>
      </div>
    </div>
  );
}

export default ClientDashboard;
