import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaBook, FaCalendar, FaMapMarkerAlt, FaUserShield, FaSave } from 'react-icons/fa';
import { getStudentProfile, updateStudentProfile } from '../services/api';
import './StudentProfile.css';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getStudentProfile();
    setProfile(data);
    setFormData(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateStudentProfile(formData);
    if (result._id) {
      setProfile(result);
      setMessage('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} />
            ) : (
              <FaUser />
            )}
          </div>
          <h2>{profile.name}</h2>
          <p className="profile-role">Student</p>
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
              />
            </div>
            <div className="form-field">
              <label><FaCalendar /> Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                disabled={!editing}
              />
            </div>
            <div className="form-field">
              <label>Gender</label>
              <select
                value={formData.gender || ''}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                disabled={!editing}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Academic Information</h3>
          <div className="form-grid">
            <div className="form-field">
              <label><FaUniversity /> College/University</label>
              <input
                type="text"
                value={formData.college || ''}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
                disabled={!editing}
                placeholder="Enter your college name"
              />
            </div>
            <div className="form-field">
              <label><FaBook /> Course</label>
              <input
                type="text"
                value={formData.course || ''}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                disabled={!editing}
                placeholder="e.g., B.Tech Computer Science"
              />
            </div>
            <div className="form-field">
              <label>Year</label>
              <select
                value={formData.year || ''}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                disabled={!editing}
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Address Information</h3>
          <div className="form-grid">
            <div className="form-field full-width">
              <label><FaMapMarkerAlt /> Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
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
          <h3>Emergency Contact</h3>
          <div className="form-grid">
            <div className="form-field">
              <label><FaUserShield /> Contact Name</label>
              <input
                type="text"
                value={formData.emergencyContact?.name || ''}
                onChange={(e) => setFormData({
                  ...formData, 
                  emergencyContact: {...formData.emergencyContact, name: e.target.value}
                })}
                disabled={!editing}
                placeholder="Emergency contact name"
              />
            </div>
            <div className="form-field">
              <label><FaPhone /> Contact Phone</label>
              <input
                type="tel"
                value={formData.emergencyContact?.phone || ''}
                onChange={(e) => setFormData({
                  ...formData, 
                  emergencyContact: {...formData.emergencyContact, phone: e.target.value}
                })}
                disabled={!editing}
                placeholder="Emergency contact phone"
              />
            </div>
            <div className="form-field">
              <label>Relation</label>
              <input
                type="text"
                value={formData.emergencyContact?.relation || ''}
                onChange={(e) => setFormData({
                  ...formData, 
                  emergencyContact: {...formData.emergencyContact, relation: e.target.value}
                })}
                disabled={!editing}
                placeholder="e.g., Father, Mother"
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>About Me</h3>
          <div className="form-field full-width">
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              disabled={!editing}
              placeholder="Tell us about yourself..."
              rows="4"
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
  );
};

export default StudentProfile;
