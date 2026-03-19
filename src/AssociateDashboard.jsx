import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FolderOpen, 
  FileText, 
  LogOut, 
  User, 
  Edit, 
  Save, 
  Camera, 
  Plus, 
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import './AssociateDashboard.css';

// SUB-COMPONENTS (Defined outside to prevent focus loss)
const AssociateOverview = ({ profileData }) => (
  <div className="dashboard-view-alt">
    <div className="welcome-section">
      <h1 className="welcome-title">Welcome, {profileData.firstName || 'User'}</h1>
      <p className="welcome-subtitle">Manage your assigned clients and track applications.</p>
    </div>

    <div className="stats-grid">
      <div className="stat-card active">
        <div className="stat-value">0</div>
        <div className="stat-label">Assigned Clients</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">0</div>
        <div className="stat-label">Active Application</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">3</div>
        <div className="stat-label">Pending Tasks</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">0</div>
        <div className="stat-label">Interviews This week</div>
      </div>
    </div>

    <div className="dashboard-bottom-grid">
      <div className="activity-card">
        <h2 className="card-title">Recent Client Activity</h2>
      </div>
      <div className="activity-card">
        <h2 className="card-title">Upcoming Tasks</h2>
      </div>
    </div>
  </div>
);

const AssociateClientList = ({ 
  allUsers, 
  clientSearchTerm, 
  setClientSearchTerm, 
  setIsAddClientModalOpen, 
  isAddClientModalOpen,
  newUserForm,
  setNewUserForm,
  handleAddNewAssociate,
  handleModalImageUpload,
  handleFormChange,
  fullName
}) => {
  const clients = allUsers.filter(u => u.role === 'client' && u.associateAssigned === fullName);
  const filteredClients = clients.filter(c => 
    `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  return (
    <div className="admin-view" style={{ padding: 0 }}>
      <div className="admin-view-header-flex">
        <h1 className="admin-view-title" style={{ fontSize: '28px' }}>My Clients</h1>
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
          <button className="btn-primary-solid" style={{ background: '#0F172A' }} onClick={() => {
            setNewUserForm(prev => ({ ...prev, role: 'client' }));
            setIsAddClientModalOpen(true);
          }}>
            <Plus size={18} /> Add Client
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-row admin-table-header" style={{ gridTemplateColumns: '80px 1.5fr 1.5fr 1fr 1fr 100px', background: '#F8FAFC' }}>
          <span>Photo</span>
          <span>Client Name</span>
          <span>Email</span>
          <span>Status</span>
          <span>Plan</span>
          <span>Action</span>
        </div>
        
        {filteredClients.length > 0 ? filteredClients.map(c => (
          <div key={c.id} className="admin-table-row" style={{ gridTemplateColumns: '80px 1.5fr 1.5fr 1fr 1fr 100px' }}>
            <div className="user-profile-circle" style={{ width: 40, height: 40, overflow: 'hidden' }}>
              {c.profilePicture ? (
                <img src={c.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                (c.firstName || 'U').charAt(0).toUpperCase()
              )}
            </div>
            <span style={{ fontWeight: 600 }}>{c.firstName} {c.lastName}</span>
            <span>{c.email}</span>
            <span className={`status-pill ${c.status === 'active' ? 'success' : 'pending'}`}>
              {c.status || 'Active'}
            </span>
            <span>{c.subscription || 'Free'}</span>
            <button className="btn-secondary-outline" style={{ padding: '4px 12px', fontSize: '12px' }}>Manage</button>
          </div>
        )) : (
          <div style={{ padding: '80px', textAlign: 'center', color: '#64748B', background: 'white', borderRadius: '12px' }}>
             <Users size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
             <p>No clients found matching your search.</p>
          </div>
        )}
      </div>

      {isAddClientModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '0', borderRadius: '16px', width: '95%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Register New Client</h2>
              <button onClick={() => setIsAddClientModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748B' }}><CloseIcon size={24} /></button>
            </div>
            
            <form onSubmit={handleAddNewAssociate} style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
                {/* LEFT COLUMN: PERSONAL & JOB PREFS */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Personal Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt">Last Name *</label><input type="text" name="lastName" required className="sa-input-alt" value={newUserForm.lastName} onChange={handleFormChange} placeholder="Type here..." /></div>
                     <div className="input-group-alt"><label className="sa-label-alt">First Name *</label><input type="text" name="firstName" required className="sa-input-alt" value={newUserForm.firstName} onChange={handleFormChange} placeholder="Type here..." /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt">E-mail Address *</label><input type="email" name="email" required className="sa-input-alt" value={newUserForm.email} onChange={handleFormChange} placeholder="user@example.com" /></div>
                     <div className="input-group-alt"><label className="sa-label-alt">Phone Number</label><input type="text" name="phone" className="sa-input-alt" value={newUserForm.phone} onChange={handleFormChange} placeholder="user@example.com" /></div>
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}><label className="sa-label-alt">Address</label><input type="text" name="address" className="sa-input-alt" value={newUserForm.address} onChange={handleFormChange} placeholder="12 oregan street" /></div>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}><label className="sa-label-alt">Linkedin URL*</label><input type="text" name="linkedinUrl" required className="sa-input-alt" value={newUserForm.linkedinUrl} onChange={handleFormChange} placeholder="linkedin.com/in/user" /></div>
                  <div className="input-group-alt" style={{ marginBottom: '32px' }}><label className="sa-label-alt">Password *</label><input type="password" name="password" required className="sa-input-alt" value={newUserForm.password} onChange={handleFormChange} placeholder="Create password" /></div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Job Preferences</h3>
                  <div className="input-group-alt" style={{ marginBottom: '16px' }}><label className="sa-label-alt">Preferred Job Title</label><input type="text" name="preferredJobTitle" className="sa-input-alt" value={newUserForm.preferredJobTitle} onChange={handleFormChange} placeholder="Type here..." /></div>
                  <div className="input-group-alt" style={{ marginBottom: '16px' }}><label className="sa-label-alt">Preferred Industry</label><input type="text" name="preferredIndustry" className="sa-input-alt" value={newUserForm.preferredIndustry} onChange={handleFormChange} placeholder="Type here..." /></div>
                  <div className="input-group-alt" style={{ marginBottom: '16px' }}><label className="sa-label-alt">Preferred Location</label><input type="text" name="preferredLocation" className="sa-input-alt" value={newUserForm.preferredLocation} onChange={handleFormChange} placeholder="Type here..." /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt">Salary Expectation Min</label><input type="text" name="salaryExpectationMin" className="sa-input-alt" value={newUserForm.salaryExpectationMin} onChange={handleFormChange} placeholder="Type here..." /></div>
                     <div className="input-group-alt"><label className="sa-label-alt">Salary Expectation Max</label><input type="text" name="salaryExpectationMax" className="sa-input-alt" value={newUserForm.salaryExpectationMax} onChange={handleFormChange} placeholder="Type here..." /></div>
                  </div>
                </div>

                {/* RIGHT COLUMN: CERTIFICATION & ASSIGNMENT */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Certification & Assignment</h3>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt">Certifications</label>
                    <textarea name="certifications" className="sa-input-alt" style={{ minHeight: '80px' }} value={newUserForm.certifications} onChange={handleFormChange} placeholder="Type here..." />
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt">Assign to Associate</label>
                    <input type="text" className="sa-input-alt" value={fullName} disabled style={{ background: '#F8FAFC' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt">Preferred Location</label><input type="text" name="preferredLocation" className="sa-input-alt" value={newUserForm.preferredLocation} onChange={handleFormChange} placeholder="Type here..." /></div>
                     <div className="input-group-alt">
                       <label className="sa-label-alt">Duration</label>
                       <select name="duration" className="sa-input-alt" value={newUserForm.duration} onChange={handleFormChange}>
                         <option value="1 Month">1 Month</option>
                         <option value="3 Months">3 Months</option>
                         <option value="6 Months">6 Months</option>
                       </select>
                     </div>
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '32px' }}>
                    <label className="sa-label-alt">Payment Status *</label>
                    <select name="paymentStatus" required className="sa-input-alt" value={newUserForm.paymentStatus} onChange={handleFormChange}>
                      <option value="">Select Plan</option>
                      <option value="Premium Plan - ₦50,000/month">Premium Plan - ₦50,000/month</option>
                      <option value="Standard Plan - ₦30,000/month">Standard Plan - ₦30,000/month</option>
                    </select>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Application Documents</h3>
                  <div className="input-group-alt" style={{ marginBottom: '32px' }}>
                    <label className="sa-label-alt">CV/Resume Used *</label>
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('assocCvUpl').click()}>
                      <span style={{ color: '#64748B' }}>Upload CV</span>
                      <input type="file" id="assocCvUpl" style={{ display: 'none' }} onChange={(e) => {
                        const file = e.target.files[0];
                        if(file) setNewUserForm({...newUserForm, cvResume: file.name});
                      }} />
                      {newUserForm.cvResume && <p style={{ marginTop: '8px', color: 'var(--primary-orange)', fontWeight: '600' }}>{newUserForm.cvResume}</p>}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Notes</h3>
                  <textarea name="notes" className="sa-input-alt" style={{ minHeight: '60px', marginBottom: '32px' }} value={newUserForm.notes} onChange={handleFormChange} placeholder="additional notes about this client..." />

                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-secondary-outline" onClick={() => setIsAddClientModalOpen(false)} style={{ color: '#991B1B', borderColor: '#991B1B' }}>Cancel</button>
                    <button type="button" className="btn-secondary-outline" style={{ color: '#991B1B', borderColor: '#991B1B' }}>Save as Draft</button>
                    <button type="submit" className="btn-primary-solid" style={{ background: '#FDBA74', border: 'none', color: 'white' }}>Submit Application</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AssociateApplicationTracker = ({ allUsers, fullName }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    clientName: '',
    jobTitle: '',
    company: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    notes: ''
  });

  const clients = allUsers.filter(u => u.role === 'client');

  const handleAppSubmit = (e) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    // Placeholder for actual submit logic
  };

  return (
    <div className="apps-view">
      <div className="view-header-flex">
        <h1 className="welcome-title">Job Application</h1>
        <button className="btn-add" onClick={() => setIsAddModalOpen(true)} style={{ background: '#B91C1C' }}><Plus size={18} /> Add Application</button>
      </div>

      <div className="job-apps-controls" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div className="search-input-wrapper" style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input type="text" className="search-input" placeholder="Type here..." style={{ paddingLeft: '40px', width: '100%' }} />
        </div>
        <button className="filter-outline-btn" style={{ border: '1px solid #991B1B', color: '#991B1B', padding: '0 20px', borderRadius: '8px' }}>Filter by Client</button>
        <button className="filter-outline-btn" style={{ border: '1px solid #991B1B', color: '#991B1B', padding: '0 20px', borderRadius: '8px' }}>Filter by Status</button>
      </div>

      <div className="table-container" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <div className="apps-table-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', padding: '16px 24px', background: '#FFF9F5', fontWeight: '700', borderBottom: '1px solid #E2E8F0' }}>
          <span>Client</span><span>Job Title</span><span>Company</span><span>Applied Date</span><span>Status</span><span>Action</span>
        </div>
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
          <Briefcase size={40} style={{ opacity: 0.2, marginBottom: '12px' }} />
          <p>No applications tracked yet. Click "Add Application" to start.</p>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '0', borderRadius: '16px', width: '95%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Track New Job Application</h2>
              <button onClick={() => setIsAddModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748B' }}><CloseIcon size={24} /></button>
            </div>
            
            <form onSubmit={handleAppSubmit} style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Basic Information</h3>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Select Client *</label>
                    <select className="sa-input-alt" required value={newAppForm.clientName} onChange={(e) => setNewAppForm({...newAppForm, clientName: e.target.value})}>
                      <option value="">Choose Client</option>
                      {clients.map(c => <option key={c.id} value={`${c.firstName} ${c.lastName}`}>{c.firstName} {c.lastName}</option>)}
                    </select>
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Job Title *</label>
                    <input type="text" className="sa-input-alt" required value={newAppForm.jobTitle} onChange={(e) => setNewAppForm({...newAppForm, jobTitle: e.target.value})} placeholder="Software Engineer" />
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Company Name *</label>
                    <input type="text" className="sa-input-alt" required value={newAppForm.company} onChange={(e) => setNewAppForm({...newAppForm, company: e.target.value})} placeholder="Tech Corp" />
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Application Details</h3>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Applied Date *</label>
                    <input type="date" className="sa-input-alt" required value={newAppForm.appliedDate} onChange={(e) => setNewAppForm({...newAppForm, appliedDate: e.target.value})} />
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '20px' }}>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Status *</label>
                    <select className="sa-input-alt" required value={newAppForm.status} onChange={(e) => setNewAppForm({...newAppForm, status: e.target.value})}>
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer Extended">Offer Extended</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Withdrawn">Withdrawn</option>
                    </select>
                  </div>
                  <div className="input-group-alt">
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Additional Notes</label>
                    <textarea className="sa-input-alt" style={{ minHeight: '100px' }} value={newAppForm.notes} onChange={(e) => setNewAppForm({...newAppForm, notes: e.target.value})} placeholder="Notes about application link, interviewers etc..." />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '40px' }}>
                <button type="button" className="btn-secondary-outline" onClick={() => setIsAddModalOpen(false)} style={{ color: '#991B1B', borderColor: '#991B1B' }}>Cancel</button>
                <button type="submit" className="btn-primary-solid" style={{ background: '#FDBA74', border: 'none', color: 'white', minWidth: '160px' }}>Track Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AssociateResourceLibrary = () => (
  <div className="docs-view">
    <div className="view-header-flex">
      <div>
         <h1 className="welcome-title">Documents Library</h1>
         <p className="welcome-subtitle">Shared templates and documents for job applications</p>
      </div>
      <button className="btn-add"><Plus size={18} /> Upload Document</button>
    </div>
    <div className="docs-filters">
      <button className="doc-filter-btn active">All</button>
      <button className="doc-filter-btn">CV Template</button>
      <button className="doc-filter-btn">Cover Letter</button>
    </div>
    <div className="docs-grid-alt">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="doc-template-cell">
          <h4>Template</h4>
          <span>45 Downloads</span>
        </div>
      ))}
    </div>
  </div>
);

const AssociateNotesLog = ({ noteContent, setNoteContent, setToast }) => (
  <div className="notes-view">
    <h1 className="welcome-title" style={{ marginBottom: '24px' }}>Notes & Log</h1>
    <div className="notes-card">
      <textarea 
        className="notes-textarea" 
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Start typing your notes here..."
      />
      <div className="flex-end">
        <button className="btn-save" onClick={() => setToast({ show: true, message: 'Notes saved locally!', type: 'success' })}>Save</button>
      </div>
    </div>
  </div>
);

const AssociateProfileSettings = ({ 
  profileData, 
  handleProfileChange, 
  handleImageUpload, 
  handleSaveProfile, 
  isEditing, 
  setIsEditing, 
  isSaving, 
  toast, 
  fullName 
}) => (
  <div className="profile-view">
    <div className="profile-view-wrapper" style={{maxWidth: '800px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="welcome-title" style={{ margin: 0 }}>My Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn-save" onClick={() => setIsEditing(true)} style={{ background: '#0F172A' }}>
              <Edit size={16} /> Edit
            </button>
          ) : (
            <button className="btn-save" onClick={handleSaveProfile} disabled={isSaving}>
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          )}
        </div>
      </div>
      {toast.show && <div style={{ padding: '12px 24px', background: toast.type === 'success' ? '#166534' : '#991B1B', color: 'white', borderRadius: '8px', marginBottom: '24px' }}>{toast.message}</div>}
      <div className="activity-card">
         <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '40px' }}>
            <input type="file" id="assocPfpInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} disabled={!isEditing} />
            <div 
              style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', cursor: isEditing ? 'pointer' : 'default' }}
              onClick={() => isEditing && document.getElementById('assocPfpInput').click()}
            >
              {profileData.profilePicture ? <img src={profileData.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={60} color="#CBD5E1" />}
              <button style={{ position: 'absolute', bottom: 0, right: 0, padding: '8px', background: 'var(--primary-orange)', color: 'white', borderRadius: '50%', border: 'none' }}><Camera size={16} /></button>
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{fullName}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{profileData.email}</p>
            </div>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="input-group-alt"><label className="sa-label-alt">First Name</label><input type="text" name="firstName" className="sa-input-alt" value={profileData.firstName} onChange={handleProfileChange} disabled={!isEditing} /></div>
            <div className="input-group-alt"><label className="sa-label-alt">Last Name</label><input type="text" name="lastName" className="sa-input-alt" value={profileData.lastName} onChange={handleProfileChange} disabled={!isEditing} /></div>
            <div style={{ gridColumn: 'span 2' }}><label className="sa-label-alt">Work Email</label><input type="email" className="sa-input-alt" value={profileData.email} disabled style={{ background: '#F8FAFC' }} /></div>
            <div className="input-group-alt"><label className="sa-label-alt">Phone Number</label><input type="text" name="phone" className="sa-input-alt" value={profileData.phone} onChange={handleProfileChange} disabled={!isEditing} /></div>
            <div className="input-group-alt"><label className="sa-label-alt">Occupation</label><input type="text" name="occupation" className="sa-input-alt" value={profileData.occupation} onChange={handleProfileChange} disabled={!isEditing} /></div>
            <div style={{ gridColumn: 'span 2' }}><label className="sa-label-alt">Bio</label><textarea name="bio" className="sa-input-alt" style={{ minHeight: '100px', padding: '12px' }} value={profileData.bio} onChange={handleProfileChange} disabled={!isEditing} /></div>
         </div>
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
function AssociateDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: 'password123',
    role: 'client',
    profilePicture: '',
    address: '',
    linkedinUrl: '',
    preferredJobTitle: '',
    preferredIndustry: '',
    preferredLocation: '',
    salaryExpectationMin: '',
    salaryExpectationMax: '',
    certifications: '',
    associateAssigned: '',
    duration: '1 Month',
    paymentStatus: '',
    cvResume: '',
    notes: ''
  });
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    occupation: user?.occupation || '',
    profilePicture: user?.profilePicture || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewUserForm(prev => ({ ...prev, [name]: value }));
  };

  const fetchUsers = async () => {
    try {
      const resp = await fetch('http://localhost:3001/api/users');
      const data = await resp.json();
      if (data.status === 'success') setAllUsers(data.data);
    } catch (err) { console.error('Failed to fetch users:', err); }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddNewAssociate = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newUserForm, associateAssigned: fullName })
      });
      const data = await resp.json();
      if (data.status === 'success') {
        setToast({ show: true, message: 'Client account created!', type: 'success' });
        setIsAddClientModalOpen(false);
        fetchUsers();
        setNewUserForm({ firstName: '', lastName: '', email: '', phone: '', password: 'password123', role: 'client', profilePicture: '', address: '', linkedinUrl: '', preferredJobTitle: '', preferredIndustry: '', preferredLocation: '', salaryExpectationMin: '', salaryExpectationMax: '', certifications: '', associateAssigned: '', duration: '1 Month', paymentStatus: '', cvResume: '', notes: '' });
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

  useEffect(() => {
    const titles = { dashboard: "Associate Dashboard", clients: "My Clients", applications: "Job Applications", documents: "Documents Library", notes: "Notes & Log", profile: "My Profile" };
    if (activeTab) document.title = `${titles[activeTab] || 'Dashboard'} | CV Unlocked Associate`;
  }, [activeTab]);

  const handleNavClick = (tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); };
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
      const resp = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileData, subRole: 'associate' })
      });
      if ((await resp.json()).status === 'success') {
        setToast({ show: true, message: 'Profile updated!', type: 'success' });
        setIsEditing(false);
      }
    } catch (err) { setToast({ show: true, message: 'Server error', type: 'error' }); }
    finally { setIsSaving(false); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); }
  };

  const fullName = `${profileData.firstName} ${profileData.lastName}`;

  const renderActiveView = () => {
    switch(activeTab) {
      case 'dashboard': return <AssociateOverview profileData={profileData} />;
      case 'clients': return (
        <AssociateClientList 
          allUsers={allUsers}
          clientSearchTerm={clientSearchTerm}
          setClientSearchTerm={setClientSearchTerm}
          isAddClientModalOpen={isAddClientModalOpen}
          setIsAddClientModalOpen={setIsAddClientModalOpen}
          newUserForm={newUserForm}
          setNewUserForm={setNewUserForm}
          handleAddNewAssociate={handleAddNewAssociate}
          handleFormChange={handleFormChange}
          fullName={fullName}
        />
      );
      case 'applications': return <AssociateApplicationTracker allUsers={allUsers} fullName={fullName} />;
      case 'documents': return <AssociateResourceLibrary />;
      case 'notes': return <AssociateNotesLog noteContent={noteContent} setNoteContent={setNoteContent} setToast={setToast} />;
      case 'profile': return <AssociateProfileSettings profileData={profileData} handleProfileChange={handleProfileChange} handleImageUpload={handleImageUpload} handleSaveProfile={handleSaveProfile} isEditing={isEditing} setIsEditing={setIsEditing} isSaving={isSaving} toast={toast} fullName={fullName} />;
      default: return <AssociateOverview profileData={profileData} />;
    }
  };

  return (
    <div className="associate-dashboard-container">
      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
      <aside className={`associate-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => handleNavClick('dashboard')} style={{ cursor: 'pointer' }}><span className="logo-main">CV<span className="logo-accent">Unlocked</span></span><span className="sidebar-portal">Associate Portal</span></div>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => handleNavClick('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}><LayoutDashboard size={18} /> Dashboard</button>
          <button onClick={() => handleNavClick('clients')} className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}><Users size={18} /> My Clients</button>
          <button onClick={() => handleNavClick('applications')} className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}><Briefcase size={18} /> Job Applications</button>
          <button onClick={() => handleNavClick('documents')} className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}><FolderOpen size={18} /> Document Libary</button>
          <button onClick={() => handleNavClick('notes')} className={`nav-item ${activeTab === 'notes' ? 'active' : ''}`}><FileText size={18} /> Notes & Log</button>
          <button onClick={() => handleNavClick('profile')} className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}><User size={18} /> My Profile</button>
        </nav>
        <div style={{ padding: '24px' }}><button onClick={onLogout} className="nav-item"><LogOut size={18} /> Logout</button></div>
      </aside>
      <div className="main-layout-right">
        <header className="associate-header">
          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}</button>
          <div className="header-user-info">
            <span className="user-full-name">{fullName}</span>
            <div className="user-profile-circle" style={{ overflow: 'hidden' }}>
              {profileData.profilePicture ? <img src={profileData.profilePicture} alt="Pfp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={24} color="#64748B" />}
            </div>
          </div>
        </header>
        <main className="main-content-wrapper">
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
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default AssociateDashboard;
