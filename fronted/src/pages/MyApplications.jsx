import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaClock } from 'react-icons/fa';
import { getStudentApplications } from '../services/api';
import './MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const data = await getStudentApplications();
    setApplications(data);
    setLoading(false);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Accepted': return 'status-accepted';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  if (loading) return <div className="loading">Loading applications...</div>;

  return (
    <div className="applications-container">
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p className="no-applications">You haven't applied to any hostels yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map(app => (
            <div key={app._id} className="application-card">
              <h3>{app.hostelId.name}</h3>
              <p className="app-address">
                <FaMapMarkerAlt /> {app.hostelId.address}
              </p>
              <p className="app-price">
                <FaRupeeSign /> {app.hostelId.price}/month
              </p>
              <div className={`app-status ${getStatusClass(app.status)}`}>
                Status: {app.status}
              </div>
              <p className="app-date">
                <FaClock /> Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
