import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaGlobe, FaBriefcase, FaSave } from 'react-icons/fa';
import { getAdminProfile, updateAdminProfile } from '../services/api';
import AdminLayout from '../components/AdminLayout';
import './AdminProfile.css';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getAdminProfile();
    setProfile(data);
    setFormData(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateAdminProfile(formData);
    if (result._id) {
      setProfile(result);
      setMessage('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">Loading profile...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle admin-avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} />
            ) : (
              <FaBuilding />
            )}
          </div>
          <h2>{profile.name}</h2>
          <p className="profile-role">Hostel Owner</p>
        </div>
        <button 
          className="edit-btn" 
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {message && <div className="success-message">{message}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-field">
              <label><FaUser /> Full Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!editing}
              />
            </div>
            <div className="form-field">
              <label><FaEnvelope /> Email</label>
              <input
                type="email"
                value={formData.email || ''}
                disabled
                className="disabled-field"
              />
            </div>
            <div className="form-field">
              <label><FaPhone /> Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!editing}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Business Information</h3>
          <div className="form-grid">
            <div className="form-field">
              <label><FaBuilding /> Business Name</label>
              <input
                type="text"
                value={formData.businessName || ''}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                disabled={!editing}
                placeholder="Your business/company name"
              />
            </div>
            <div className="form-field">
              <label><FaGlobe /> Website</label>
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                disabled={!editing}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="form-field">
              <label><FaBriefcase /> Years of Experience</label>
              <input
                type="text"
                value={formData.experience || ''}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                disabled={!editing}
                placeholder="e.g., 5 years"
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Business Address</h3>
          <div className="form-grid">
            <div className="form-field full-width">
              <label><FaMapMarkerAlt /> Address</label>
              <input
                type="text"
                value={formData.businessAddress || ''}
                onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                disabled={!editing}
                placeholder="Street address"
              />
            </div>
            <div className="form-field">
              <label>City</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                disabled={!editing}
                placeholder="City"
              />
            </div>
            <div className="form-field">
              <label>State</label>
              <input
                type="text"
                value={formData.state || ''}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                disabled={!editing}
                placeholder="State"
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>About Your Business</h3>
          <div className="form-field full-width">
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              disabled={!editing}
              placeholder="Tell students about your hostels and services..."
              rows="5"
            />
          </div>
        </div>

        {editing && (
          <button type="submit" className="save-btn">
            <FaSave /> Save Changes
          </button>
        )}
      </form>
    </div>
    </AdminLayout>
  );
};

export default AdminProfile;
