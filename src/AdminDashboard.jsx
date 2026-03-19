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
  Save,
  MoreVertical
} from 'lucide-react';
import './AdminDashboard.css';

// Sub-components defined OUTSIDE the main AdminDashboard to prevent focus loss
const AdminDashboardHome = ({ 
  setIsAddClientModalOpen, 
  isAddClientModalOpen,
  newUserForm,
  setNewUserForm,
  allUsers,
  handleAddNewAssociate,
  handleModalImageUpload,
  handleFormChange
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
                  <select name="associateAssigned" className="sa-input-alt" value={newUserForm.associateAssigned} onChange={handleFormChange}>
                    <option value="">Select Associate</option>
                    {allUsers.filter(u => u.role === 'associate').map(assoc => (
                      <option key={assoc.id} value={`${assoc.firstName} ${assoc.lastName}`}>{assoc.firstName} {assoc.lastName}</option>
                    ))}
                  </select>
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
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('cvUplIn').click()}>
                    <span style={{ color: '#64748B' }}>Upload CV</span>
                    <input type="file" id="cvUplIn" style={{ display: 'none' }} onChange={(e) => {
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

const AdminClientManager = ({ 
  allUsers, 
  clientSearchTerm, 
  setClientSearchTerm, 
  setIsAddClientModalOpen, 
  isAddClientModalOpen,
  newUserForm,
  setNewUserForm,
  handleAddNewAssociate,
  handleModalImageUpload,
  handleFormChange
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
                    <select name="associateAssigned" className="sa-input-alt" value={newUserForm.associateAssigned} onChange={handleFormChange}>
                      <option value="">Select Associate</option>
                      {allUsers.filter(u => u.role === 'associate').map(assoc => (
                        <option key={assoc.id} value={`${assoc.firstName} ${assoc.lastName}`}>{assoc.firstName} {assoc.lastName}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt">Application Deadline</label><input type="date" className="sa-input-alt" /></div>
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
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('cvUplInCM').click()}>
                      <span style={{ color: '#64748B' }}>Upload CV</span>
                      <input type="file" id="cvUplInCM" style={{ display: 'none' }} onChange={(e) => {
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

const AdminAssociateManager = ({ 
  allUsers, 
  setIsAddModalOpen, 
  isAddModalOpen, 
  newUserForm, 
  setNewUserForm, 
  handleAddNewAssociate, 
  handleModalImageUpload,
  handleFormChange,
  handleCheckChange,
  generatePassword
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
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '0', borderRadius: '16px', width: '95%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Invite a team member</h2>
              <button onClick={() => setIsAddModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748B' }}><CloseIcon size={24} /></button>
            </div>

            <form onSubmit={handleAddNewAssociate} style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
                {/* LEFT COLUMN: PERSONAL INFO & ACCOUNT SETTINGS */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Personal Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Last Name *</label><input type="text" name="lastName" required className="sa-input-alt" value={newUserForm.lastName} onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})} placeholder="Type here..." /></div>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>First Name *</label><input type="text" name="firstName" required className="sa-input-alt" value={newUserForm.firstName} onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})} placeholder="Type here..." /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Work Email *</label><input type="email" name="email" required className="sa-input-alt" value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} placeholder="user@example.com" /></div>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Phone Number</label><input type="text" name="phone" className="sa-input-alt" value={newUserForm.phone} onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})} placeholder="user@example.com" /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Department</label><input type="text" name="department" className="sa-input-alt" value={newUserForm.department} onChange={(e) => setNewUserForm({...newUserForm, department: e.target.value})} placeholder="Sales" /></div>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Job Title</label><input type="text" name="jobTitle" className="sa-input-alt" value={newUserForm.jobTitle} onChange={(e) => setNewUserForm({...newUserForm, jobTitle: e.target.value})} placeholder="Marketer" /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Start Date</label><input type="date" name="startDate" className="sa-input-alt" value={newUserForm.startDate} onChange={(e) => setNewUserForm({...newUserForm, startDate: e.target.value})} /></div>
                     <div className="input-group-alt"><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Start Date</label><input type="date" name="startDate" className="sa-input-alt" value={newUserForm.startDate} onChange={(e) => setNewUserForm({...newUserForm, startDate: e.target.value})} /></div>
                  </div>
                  <div className="input-group-alt" style={{ marginBottom: '32px' }}><label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Linkedin URL*</label><input type="text" name="linkedinUrl" className="sa-input-alt" value={newUserForm.linkedinUrl} onChange={(e) => setNewUserForm({...newUserForm, linkedinUrl: e.target.value})} placeholder="linkedin.com/in/user" /></div>

                  <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1E293B' }}>Account Settings</h3>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Password</label>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <input type="text" name="password" required className="sa-input-alt" style={{ flex: 1 }} value={newUserForm.password} onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})} placeholder="***************" />
                      <button type="button" onClick={generatePassword} style={{ padding: '0 20px', border: '1px solid #CBD5E1', borderRadius: '8px', background: 'white', fontWeight: '600', cursor: 'pointer' }}>Generate</button>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="radio" name="accountStatus" checked={newUserForm.accountStatus === 'active'} onChange={() => setNewUserForm({...newUserForm, accountStatus: 'active'})} /> Active Immediately</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="radio" name="accountStatus" checked={newUserForm.accountStatus === 'pending'} onChange={() => setNewUserForm({...newUserForm, accountStatus: 'pending'})} /> Pending Activation</label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.sendWelcomeEmail} onChange={(e) => setNewUserForm({...newUserForm, sendWelcomeEmail: e.target.checked})} /> Send welcome email with login credentials</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.requirePassChange} onChange={(e) => setNewUserForm({...newUserForm, requirePassChange: e.target.checked})} /> Require password change on first login</label>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: PERMISSION & ASSIGNMENT */}
                <div>
                  <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>Permission & Access</h3>
                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600' }}>Access Level</label>
                    <select name="accessLevel" className="sa-input-alt" style={{ marginBottom: '20px' }} value={newUserForm.accessLevel} onChange={(e) => setNewUserForm({...newUserForm, accessLevel: e.target.value})}>
                      <option value="Standard Associate">Standard Associate</option>
                      <option value="Senior Associate">Senior Associate</option>
                      <option value="Admin Access">Admin Access</option>
                    </select>

                    <label className="sa-label-alt" style={{ color: '#1E293B', fontWeight: '600', marginBottom: '12px' }}>Permission</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.permissions.viewClients} onChange={() => handleCheckChange('viewClients')} /> View assigned clients</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.permissions.editClients} onChange={() => handleCheckChange('editClients')} /> Edit client profiles</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.permissions.submitApps} onChange={() => handleCheckChange('submitApps')} /> Submit job applications</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.permissions.uploadDocs} onChange={() => handleCheckChange('uploadDocs')} /> Upload documents</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.permissions.messages} onChange={() => handleCheckChange('messages')} /> Send messages to clients</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={newUserForm.permissions.viewAll} onChange={() => handleCheckChange('viewAll')} /> View all clients</label>
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: '#1E293B' }}>Initial Client Assigned</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>Assign existing clients to this associate (optional)</p>
                    <div className="input-group-alt">
                      <select name="initialClient" className="sa-input-alt" onChange={(e) => setNewUserForm({...newUserForm, associateAssigned: e.target.value})}>
                        <option value="">Start typing...</option>
                        {clients.map(c => <option key={c.id} value={`${c.firstName} ${c.lastName}`}>{c.firstName} {c.lastName}</option>)}
                      </select>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748B', marginTop: '8px' }}>0 clients selected</p>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-secondary-outline" onClick={() => setIsAddModalOpen(false)} style={{ color: '#991B1B', borderColor: '#991B1B' }}>Cancel</button>
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
    notes: '',
    department: '',
    jobTitle: '',
    startDate: new Date().toISOString().split('T')[0],
    accessLevel: 'Standard Associate',
    permissions: {
      viewClients: false,
      editClients: false,
      submitApps: false,
      uploadDocs: false,
      messages: false,
      viewAll: false
    },
    accountStatus: 'active',
    sendWelcomeEmail: true,
    requirePassChange: true
  });
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

  const handleCheckChange = (perm) => {
    setNewUserForm(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm]
      }
    }));
  };

  const generatePassword = () => {
    const pass = Math.random().toString(36).slice(-8);
    setNewUserForm(prev => ({ ...prev, password: pass }));
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
          allUsers={allUsers}
          handleAddNewAssociate={handleAddNewAssociate}
          handleModalImageUpload={handleModalImageUpload}
          handleFormChange={handleFormChange}
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
          handleFormChange={handleFormChange}
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
          handleFormChange={handleFormChange}
          handleCheckChange={handleCheckChange}
          generatePassword={generatePassword}
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
