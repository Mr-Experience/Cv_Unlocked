import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  PieChart, 
  LogOut, 
  User, 
  Plus, 
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  Menu,
  X as CloseIcon,
  Circle,
  Camera,
  Edit,
  Save
} from 'lucide-react';
import './AdminDashboard.css';

// Sub-components defined OUTSIDE the main AdminDashboard to prevent focus loss
const AdminDashboardHome = ({ 
  setIsAddClientModalOpen, 
  isAddClientModalOpen,
  newUserForm,
  setNewUserForm,
  handleAddNewAssociate,
  handleModalImageUpload 
}) => (
  <div className="admin-view">
    <div className="admin-view-header-flex">
      <h1 className="admin-view-title">Admin Dashboard</h1>
      <div className="admin-header-actions">
        <button className="btn-secondary-outline">Export Report</button>
        <button className="btn-primary-solid" onClick={() => {
          setNewUserForm(prev => ({ ...prev, role: 'client' }));
          setIsAddClientModalOpen(true);
        }}>
          <Plus size={18} /> Add Client
        </button>
      </div>
    </div>

    <div className="admin-stats-grid">
      <div className="admin-stat-card orange-tint">
        <div className="admin-stat-value">37</div>
        <div className="admin-stat-label">Total Clients</div>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-value">0</div>
        <div className="admin-stat-label">Active Subscription</div>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-value">7</div>
        <div className="admin-stat-label">Client Associate</div>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-value">6</div>
        <div className="admin-stat-label">Total Applicantions</div>
      </div>
      <div className="admin-stat-card dark">
        <div className="admin-stat-value">$0.00</div>
        <div className="admin-stat-label">Total Revenue (MTD)</div>
      </div>
    </div>

    <div className="dashboard-bottom-grid">
      <div className="activity-card">
        <h2 className="card-title">Associate Performance</h2>
      </div>
      <div className="activity-card">
        <h2 className="card-title">Expiring Subscription</h2>
      </div>
    </div>

    {isAddClientModalOpen && (
      <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
        <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '90%', maxWidth: '500px', position: 'relative' }}>
          <button onClick={() => setIsAddClientModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', cursor: 'pointer' }}><CloseIcon size={24} color="#64748B" /></button>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', textAlign: 'center' }}>Create Client Account</h2>
          <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>Fill in the details to register a new client</p>
          <form onSubmit={handleAddNewAssociate}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '2px dashed #CBD5E1' }}>
                {newUserForm.profilePicture ? <img src={newUserForm.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} color="#CBD5E1" />}
                <label htmlFor="dashClientImgIn" style={{ position: 'absolute', bottom: 0, right: 0, padding: '6px', background: 'var(--primary-orange)', color: 'white', borderRadius: '50%', cursor: 'pointer' }}><Camera size={14} /></label>
              </div>
              <input type="file" id="dashClientImgIn" accept="image/*" style={{ display: 'none' }} onChange={handleModalImageUpload} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <input type="text" className="search-input" placeholder="First Name" required value={newUserForm.firstName} onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})} style={{ paddingLeft: '12px' }} />
              <input type="text" className="search-input" placeholder="Last Name" required value={newUserForm.lastName} onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})} style={{ paddingLeft: '12px' }} />
            </div>
            <input type="email" className="search-input" placeholder="Email Address" required value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '16px' }} />
            <input type="password" className="search-input" placeholder="Create Password" required value={newUserForm.password} onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '16px' }} />
            <input type="text" className="search-input" placeholder="Phone Number" value={newUserForm.phone} onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '24px' }} />
            <button type="submit" className="btn-primary-solid" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>Complete Registration</button>
          </form>
        </div>
      </div>
    )}
  </div>
);

const AdminClientManager = ({ 
  allUsers, 
  clientSearchTerm, 
  setClientSearchTerm, 
  setIsAddClientModalOpen, 
  isAddClientModalOpen,
  newUserForm,
  setNewUserForm,
  handleAddNewAssociate,
  handleModalImageUpload
}) => {
  const clients = allUsers.filter(u => u.role === 'client');
  const filteredClients = clients.filter(c => 
    `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  return (
    <div className="admin-view">
      <div className="admin-view-header-flex">
        <h1 className="admin-view-title">All Clients</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="search-input-wrapper" style={{ minWidth: '300px', marginBottom: 0 }}>
            <Search size={18} className="search-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', zIndex: 10 }} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search clients..." 
              value={clientSearchTerm}
              onChange={(e) => setClientSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px', height: '44px' }}
            />
          </div>
          <button className="btn-primary-solid" onClick={() => {
            setNewUserForm(prev => ({ ...prev, role: 'client' }));
            setIsAddClientModalOpen(true);
          }}>
            <Plus size={18} /> Add Client
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-row admin-table-header" style={{ gridTemplateColumns: '120px 1.5fr 1.5fr 1.5fr 1fr 1fr 100px' }}>
          <span>Profile Picture</span>
          <span>Client</span>
          <span>Email</span>
          <span>Consultant</span>
          <span>Status</span>
          <span>Plan</span>
          <span>Action</span>
        </div>
        
        {filteredClients.length > 0 ? filteredClients.map(c => (
          <div key={c.id} className="admin-table-row" style={{ gridTemplateColumns: '120px 1.5fr 1.5fr 1.5fr 1fr 1fr 100px' }}>
            <div className="user-profile-circle" style={{ width: 40, height: 40, overflow: 'hidden' }}>
              {c.profilePicture ? (
                <img src={c.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                (c.firstName || 'U').charAt(0).toUpperCase()
              )}
            </div>
            <span style={{ fontWeight: 600 }}>{c.firstName} {c.lastName}</span>
            <span>{c.email}</span>
            <span>{c.associateAssigned || '-'}</span>
            <span className={`status-pill ${c.status === 'active' ? 'success' : 'pending'}`}>
              {c.status || 'Active'}
            </span>
            <span>{c.subscription || 'Free'}</span>
            <button className="btn-secondary-outline" style={{ padding: '4px 12px', fontSize: '13px', borderColor: 'var(--primary-orange)', color: 'var(--primary-orange)' }}>View</button>
          </div>
        )) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
            No clients found matching your search.
          </div>
        )}
      </div>

      {isAddClientModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsAddClientModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', cursor: 'pointer' }}><CloseIcon size={24} color="#64748B" /></button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', textAlign: 'center' }}>Create Client Account</h2>
            <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>Fill in the details to register a new client</p>
            <form onSubmit={handleAddNewAssociate}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '2px dashed #CBD5E1' }}>
                  {newUserForm.profilePicture ? <img src={newUserForm.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} color="#CBD5E1" />}
                  <label htmlFor="clientImgUpload" style={{ position: 'absolute', bottom: 0, right: 0, padding: '6px', background: 'var(--primary-orange)', color: 'white', borderRadius: '50%', cursor: 'pointer' }}><Camera size={14} /></label>
                </div>
                <input type="file" id="clientImgUpload" accept="image/*" style={{ display: 'none' }} onChange={handleModalImageUpload} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="text" className="search-input" placeholder="First Name" required value={newUserForm.firstName} onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})} style={{ paddingLeft: '12px' }} />
                <input type="text" className="search-input" placeholder="Last Name" required value={newUserForm.lastName} onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})} style={{ paddingLeft: '12px' }} />
              </div>
              <input type="email" className="search-input" placeholder="Email Address" required value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '16px' }} />
              <input type="password" className="search-input" placeholder="Create Password" required value={newUserForm.password} onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '16px' }} />
              <input type="text" className="search-input" placeholder="Phone Number" value={newUserForm.phone} onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '24px' }} />
              <button type="submit" className="btn-primary-solid" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>Complete Registration</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminAssociateManager = ({ 
  allUsers, 
  setIsAddModalOpen, 
  isAddModalOpen, 
  newUserForm, 
  setNewUserForm, 
  handleAddNewAssociate, 
  handleModalImageUpload 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const demoAssociates = [
    { id: 'd1', firstName: 'Samantha', lastName: 'Lee', role: 'associate', profilePicture: null },
    { id: 'd2', firstName: 'Michael', lastName: 'Osei', role: 'associate', profilePicture: null },
    { id: 'd3', firstName: 'Priya', lastName: 'Patel', role: 'associate', profilePicture: null },
    { id: 'd4', firstName: 'Daniel', lastName: 'Smith', role: 'associate', profilePicture: null },
    { id: 'd5', firstName: 'Bolaji', lastName: 'Ilori', role: 'associate', profilePicture: null },
    { id: 'd6', firstName: 'Christiana', lastName: 'Oyegbade', role: 'associate', profilePicture: null }
  ];

  const dbAssociates = allUsers.filter(u => u.role === 'associate');
  const baseAssociates = dbAssociates.length > 0 ? dbAssociates : demoAssociates;
  const associates = baseAssociates.filter(a => `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="admin-view">
      <div className="admin-view-header-flex">
        <h1 className="admin-view-title">Client Associates</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="search-input-wrapper" style={{ minWidth: '300px', marginBottom: 0 }}>
            <Search size={18} className="search-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', zIndex: 10 }} />
            <input type="text" className="search-input" placeholder="Search associates..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ paddingLeft: '40px', height: '44px' }} />
          </div>
          <button className="btn-primary-solid" onClick={() => {
            setNewUserForm(prev => ({ ...prev, role: 'associate' }));
            setIsAddModalOpen(true);
          }}>
            <Plus size={18} /> Add associate
          </button>
        </div>
      </div>

      <div className="associates-grid">
        {associates.map((assoc, index) => {
          const assocName = `${assoc.firstName || ''} ${assoc.lastName || ''}`;
          const initial = assoc.firstName ? assoc.firstName.charAt(0).toUpperCase() : '?';
          const colors = ['#0F172A', '#1E293B', '#334155', '#475569', '#64748B', '#94A3B8'];
          const bgColor = colors[index % colors.length];
          return (
            <div key={assoc.id} className="associate-profile-card">
              <div className="user-profile-circle" style={{ width: '80px', height: '80px', margin: '0 auto 16px', fontSize: '28px', overflow: 'hidden', background: assoc.profilePicture ? 'transparent' : bgColor, color: 'white', fontWeight: '700' }}>
                {assoc.profilePicture ? <img src={assoc.profilePicture} alt={assocName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
              </div>
              <h3 className="associate-name">{assocName}</h3>
              <div className="admin-stat-value" style={{ fontSize: '32px' }}>0</div>
              <div className="admin-stat-label">Total Clients</div>
              <button className="btn-profile-view">View Profile</button>
            </div>
          );
        })}
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsAddModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', cursor: 'pointer' }}><CloseIcon size={24} color="#64748B" /></button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', textAlign: 'center' }}>Add New Associate</h2>
            <form onSubmit={handleAddNewAssociate}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '2px dashed #CBD5E1' }}>
                  {newUserForm.profilePicture ? <img src={newUserForm.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} color="#CBD5E1" />}
                  <label htmlFor="assocImgUpload" style={{ position: 'absolute', bottom: 0, right: 0, padding: '6px', background: 'var(--primary-orange)', color: 'white', borderRadius: '50%', cursor: 'pointer' }}><Camera size={14} /></label>
                </div>
                <input type="file" id="assocImgUpload" accept="image/*" style={{ display: 'none' }} onChange={handleModalImageUpload} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="text" className="search-input" placeholder="First Name" required value={newUserForm.firstName} onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})} style={{ paddingLeft: '12px' }} />
                <input type="text" className="search-input" placeholder="Last Name" required value={newUserForm.lastName} onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})} style={{ paddingLeft: '12px' }} />
              </div>
              <input type="email" className="search-input" placeholder="Email Address" required value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '16px' }} />
              <input type="password" className="search-input" placeholder="Create Password" required value={newUserForm.password} onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '16px' }} />
              <input type="text" className="search-input" placeholder="Phone Number" value={newUserForm.phone} onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})} style={{ paddingLeft: '12px', marginBottom: '24px' }} />
              <button type="submit" className="btn-primary-solid" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>Create Associate Account</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminRecruitmentTracker = () => (
  <div className="admin-view">
    <div className="admin-view-header-flex">
      <div>
        <h1 className="admin-view-title">Job Application</h1>
        <div className="job-apps-controls" style={{ marginTop: '16px' }}>
          <div className="search-input-wrapper">
            <input type="text" className="search-input" placeholder="Type here..." />
          </div>
          <button className="filter-outline-btn" style={{ border: '1.5px solid #991B1B', color: '#991B1B' }}>Filter</button>
          <button className="filter-outline-btn" style={{ border: '1.5px solid #991B1B', color: '#991B1B' }}>Export</button>
        </div>
      </div>
      <div className="app-mini-stats">
        <div className="mini-stat-item"><div className="mini-stat-val">6</div><div className="mini-stat-lbl">Total</div></div>
        <div className="mini-stat-item"><div className="mini-stat-val">3</div><div className="mini-stat-lbl">Applied</div></div>
        <div className="mini-stat-item"><div className="mini-stat-val">1</div><div className="mini-stat-lbl">Interview</div></div>
        <div className="mini-stat-item"><div className="mini-stat-val">0</div><div className="mini-stat-lbl">Offered</div></div>
        <div className="mini-stat-item"><div className="mini-stat-val">0</div><div className="mini-stat-lbl">Rejected</div></div>
      </div>
    </div>

    <div className="admin-table-container">
      <div className="admin-table-row admin-table-header" style={{ gridTemplateColumns: '1.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1fr 100px' }}>
        <span>Client</span><span>Job Title</span><span>Company</span><span>Associates</span><span>Applied Date</span><span>Status</span><span>Action</span>
      </div>
      <div className="admin-table-row" style={{ gridTemplateColumns: '1.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1fr 100px' }}>
        <span>Bolaji Emmanuel</span><span>Product Manager</span><span>InnovateTech</span><span>-</span><span>Mar 3, 2026 10:05 am</span><span className="status-pill success" style={{ background: '#166534' }}>Yes</span><button className="btn-secondary-outline" style={{ padding: '4px 12px', fontSize: '13px', borderColor: '#EB5E00', color: '#EB5E00' }}>view</button>
      </div>
    </div>
  </div>
);

const AdminBillingHub = () => (
  <div className="admin-view">
    <div className="admin-view-header-flex">
      <h1 className="admin-view-title">Payment & Billing</h1>
      <div className="admin-header-actions">
        <button className="btn-primary-solid"><Plus size={18} /> Add Payment</button>
        <button className="btn-secondary-outline" style={{ border: '1px solid #991B1B', color: '#991B1B' }}>Export</button>
      </div>
    </div>
    <div className="payment-stat-grid">
      <div className="payment-stat-card green"><div className="admin-stat-value" style={{ color: 'white' }}>$400</div><div className="admin-stat-label">This Month</div></div>
      <div className="payment-stat-card blue"><div className="admin-stat-value" style={{ color: 'white' }}>2</div><div className="admin-stat-label">Active Subs</div></div>
      <div className="payment-stat-card yellow"><div className="admin-stat-value" style={{ color: 'white' }}>0</div><div className="admin-stat-label">Pending</div></div>
      <div className="payment-stat-card red"><div className="admin-stat-value" style={{ color: 'white' }}>0</div><div className="admin-stat-label">Expired</div></div>
    </div>
  </div>
);

const AdminAnalytics = () => (
  <div className="admin-view">
    <div className="admin-view-header-flex">
      <h1 className="admin-view-title">Reports & Analytics</h1>
    </div>
    <div className="admin-reports-layout">
      <div><h3 className="report-section-title">Client Growth</h3><div className="chart-placeholder-card"></div></div>
      <div><h3 className="report-section-title">Revenue Trend</h3><div className="chart-placeholder-card"></div></div>
    </div>
  </div>
);

const AdminProfileSettings = ({ 
  profileData, 
  handleProfileChange, 
  handleSaveProfile, 
  isEditing, 
  setIsEditing, 
  isSaving, 
  toast 
}) => (
  <div className="profile-view-container" style={{ margin: '0' }}>
    <div className="profile-view-header">
      <h1 className="profile-title">My profile</h1>
      <div className="profile-actions">
        {!isEditing ? (
          <button className="btn-edit" onClick={() => setIsEditing(true)}><Edit size={16} /> Edit</button>
        ) : (
          <button className="btn-save" onClick={handleSaveProfile} disabled={isSaving}><Save size={16} /> {isSaving ? 'Saving...' : 'Save changes'}</button>
        )}
      </div>
    </div>
    {toast.show && <div style={{ padding: '12px 24px', background: toast.type === 'success' ? '#166534' : '#991B1B', color: 'white', borderRadius: '8px', marginBottom: '24px' }}>{toast.message}</div>}
    <div className="profile-grid">
      <div className="profile-card">
        <h2 className="card-title">Personal Information</h2>
        <div className="form-row">
          <div className="input-group"><label className="input-label">First Name</label><input type="text" name="firstName" className="profile-input" value={profileData.firstName} onChange={handleProfileChange} disabled={!isEditing} /></div>
          <div className="input-group"><label className="input-label">Last Name</label><input type="text" name="lastName" className="profile-input" value={profileData.lastName} onChange={handleProfileChange} disabled={!isEditing} /></div>
        </div>
        <div className="form-row">
          <div className="input-group"><label className="input-label">Email Address</label><input type="email" name="email" className="profile-input" value={profileData.email} onChange={handleProfileChange} disabled={!isEditing} /></div>
          <div className="input-group"><label className="input-label">Phone Number</label><input type="text" name="phone" className="profile-input" value={profileData.phone} onChange={handleProfileChange} disabled={!isEditing} /></div>
        </div>
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '090876655',
    profilePicture: user?.profilePicture || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [newUserForm, setNewUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: 'password123',
    role: 'associate',
    profilePicture: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchUsers = async () => {
    try {
      const resp = await fetch('http://localhost:3001/api/users');
      const data = await resp.json();
      if (data.status === 'success') setAllUsers(data.data);
    } catch (err) { console.error('Failed to fetch users:', err); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddNewAssociate = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserForm)
      });
      const data = await resp.json();
      if (data.status === 'success') {
        setToast({ show: true, message: 'Account created successfully!', type: 'success' });
        setIsAddModalOpen(false);
        setIsAddClientModalOpen(false);
        fetchUsers();
        setNewUserForm({ firstName: '', lastName: '', email: '', phone: '', password: 'password123', role: 'associate', profilePicture: '' });
      }
    } catch (err) { setToast({ show: true, message: 'Server error', type: 'error' }); }
    finally { setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); }
  };

  const handleModalImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewUserForm(prev => ({ ...prev, profilePicture: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const resp = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileData, subRole: 'admin' })
      });
      if ((await resp.json()).status === 'success') {
        setToast({ show: true, message: 'Profile updated!', type: 'success' });
        setIsEditing(false);
      }
    } catch (err) { setToast({ show: true, message: 'Update failed', type: 'error' }); }
    finally { setIsSaving(false); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return (
        <AdminDashboardHome 
          setIsAddClientModalOpen={setIsAddClientModalOpen}
          isAddClientModalOpen={isAddClientModalOpen}
          newUserForm={newUserForm}
          setNewUserForm={setNewUserForm}
          handleAddNewAssociate={handleAddNewAssociate}
          handleModalImageUpload={handleModalImageUpload}
        />
      );
      case 'clients': return (
        <AdminClientManager 
          allUsers={allUsers} 
          clientSearchTerm={clientSearchTerm} 
          setClientSearchTerm={setClientSearchTerm} 
          isAddClientModalOpen={isAddClientModalOpen}
          setIsAddClientModalOpen={setIsAddClientModalOpen}
          newUserForm={newUserForm}
          setNewUserForm={setNewUserForm}
          handleAddNewAssociate={handleAddNewAssociate}
          handleModalImageUpload={handleModalImageUpload}
        />
      );
      case 'associates': return (
        <AdminAssociateManager 
          allUsers={allUsers} 
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          newUserForm={newUserForm}
          setNewUserForm={setNewUserForm}
          handleAddNewAssociate={handleAddNewAssociate}
          handleModalImageUpload={handleModalImageUpload}
        />
      );
      case 'applications': return <AdminRecruitmentTracker />;
      case 'payments': return <AdminBillingHub />;
      case 'reports': return <AdminAnalytics />;
      case 'profile': return (
        <AdminProfileSettings 
          profileData={profileData} 
          handleProfileChange={handleProfileChange} 
          handleSaveProfile={handleSaveProfile} 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          isSaving={isSaving} 
          toast={toast} 
        />
      );
      default: return <AdminDashboardHome />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <span className="admin-logo-main">CV<span className="admin-logo-accent">Unlocked</span></span>
            <span className="admin-sidebar-portal">Admin Portal</span>
          </div>
        </div>
        <nav className="admin-sidebar-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20} /> Dashboard</button>
          <button className={`admin-nav-item ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => setActiveTab('clients')}><Users size={20} /> All Clients</button>
          <button className={`admin-nav-item ${activeTab === 'associates' ? 'active' : ''}`} onClick={() => setActiveTab('associates')}><Users size={20} /> Associates</button>
          <button className={`admin-nav-item ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}><Briefcase size={20} /> All Applications</button>
          <button className={`admin-nav-item ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}><CreditCard size={20} /> Payments</button>
          <button className={`admin-nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}><PieChart size={20} /> Reports</button>
          <button className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><User size={20} /> My Profile</button>
        </nav>
        <button className="admin-nav-item" onClick={onLogout} style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}><LogOut size={20} /> Logout</button>
      </aside>

      <main className="admin-main-layout-right">
        <header className="admin-header">
          <button className="admin-mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
          <div className="header-user-info">
            <span className="user-full-name">{profileData.firstName} {profileData.lastName}</span>
            <div className="user-profile-circle" style={{ overflow: 'hidden' }}>
              {profileData.profilePicture ? <img src={profileData.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={20} />}
            </div>
          </div>
        </header>
        <div className="admin-main-content-wrapper">
          {toast.show && (
            <div style={{ 
              position: 'fixed', 
              top: '24px', 
              right: '24px', 
              background: toast.type === 'success' ? '#166534' : '#991B1B', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '12px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
              zIndex: 2000,
              fontWeight: '600',
              animation: 'slideIn 0.3s ease-out'
            }}>
              {toast.message}
            </div>
          )}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
