import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaGraduationCap, FaHome, FaBed, FaCalendar, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import './ApplicationDetailModal.css';

const ApplicationDetailModal = ({ application, onClose, onStatusUpdate, onDelete }) => {
  if (!application) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Application Details</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {/* Status Badge */}
          <div className="status-section">
            <span className={`status-badge-large status-${application.status.toLowerCase()}`}>
              {application.status}
            </span>
            <p className="application-date">
              Applied on: {formatDate(application.createdAt)}
            </p>
          </div>

          {/* Hostel Information */}
          <div className="detail-section">
            <h3>Hostel Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Hostel Name:</strong>
                <span>{application.hostelId?.name}</span>
              </div>
              <div className="info-item">
                <strong>Address:</strong>
                <span>{application.hostelId?.address}</span>
              </div>
              <div className="info-item">
                <strong>Price:</strong>
                <span>₹{application.hostelId?.price}/month</span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="detail-section">
            <h3><FaUser /> Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Full Name:</strong>
                <span>{application.fullName}</span>
              </div>
              <div className="info-item">
                <strong><FaEnvelope /> Email:</strong>
                <span>{application.email}</span>
              </div>
              <div className="info-item">
                <strong><FaPhone /> Phone:</strong>
                <span>{application.phone}</span>
              </div>
              <div className="info-item">
                <strong><FaBirthdayCake /> Date of Birth:</strong>
                <span>{formatDate(application.dateOfBirth)}</span>
              </div>
              <div className="info-item">
                <strong>Gender:</strong>
                <span>{application.gender}</span>
              </div>
            </div>
          </div>

          {/* Educational Information */}
          <div className="detail-section">
            <h3><FaGraduationCap /> Educational Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>College/University:</strong>
                <span>{application.college}</span>
              </div>
              <div className="info-item">
                <strong>Course:</strong>
                <span>{application.course}</span>
              </div>
              <div className="info-item">
                <strong>Year:</strong>
                <span>{application.year}</span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="detail-section">
            <h3><FaHome /> Address Information</h3>
            <div className="info-grid">
              <div className="info-item full-width">
                <strong>Current Address:</strong>
                <span>{application.currentAddress}</span>
              </div>
              <div className="info-item full-width">
                <strong>Permanent Address:</strong>
                <span>{application.permanentAddress}</span>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div className="detail-section">
            <h3>Parent/Guardian Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Father's Name:</strong>
                <span>{application.fatherName}</span>
              </div>
              <div className="info-item">
                <strong>Father's Phone:</strong>
                <span>{application.fatherPhone}</span>
              </div>
              <div className="info-item">
                <strong>Father's Occupation:</strong>
                <span>{application.fatherOccupation}</span>
              </div>
              <div className="info-item">
                <strong>Mother's Name:</strong>
                <span>{application.motherName}</span>
              </div>
              <div className="info-item">
                <strong>Mother's Phone:</strong>
                <span>{application.motherPhone}</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="detail-section">
            <h3>Emergency Contact</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Name:</strong>
                <span>{application.emergencyContact?.name}</span>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <span>{application.emergencyContact?.phone}</span>
              </div>
              <div className="info-item">
                <strong>Relation:</strong>
                <span>{application.emergencyContact?.relation}</span>
              </div>
            </div>
          </div>

          {/* Accommodation Preferences */}
          <div className="detail-section">
            <h3><FaBed /> Accommodation Preferences</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Preferred Room Type:</strong>
                <span>{application.preferredRoomType}</span>
              </div>
              <div className="info-item">
                <strong><FaCalendar /> Move-in Date:</strong>
                <span>{formatDate(application.moveInDate)}</span>
              </div>
              <div className="info-item">
                <strong>Duration:</strong>
                <span>{application.duration}</span>
              </div>
              {application.specialRequirements && (
                <div className="info-item full-width">
                  <strong>Special Requirements:</strong>
                  <span>{application.specialRequirements}</span>
                </div>
              )}
            </div>
          </div>

          {/* Medical Information */}
          {(application.hasAllergies || application.hasMedicalConditions) && (
            <div className="detail-section medical-section">
              <h3><FaExclamationTriangle /> Medical Information</h3>
              <div className="info-grid">
                {application.hasAllergies && (
                  <div className="info-item full-width">
                    <strong>Allergies:</strong>
                    <span className="medical-info">{application.allergiesDetails}</span>
                  </div>
                )}
                {application.hasMedicalConditions && (
                  <div className="info-item full-width">
                    <strong>Medical Conditions:</strong>
                    <span className="medical-info">{application.medicalConditionsDetails}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="modal-footer">
          {application.status === 'Pending' && onStatusUpdate && (
            <>
              <button 
                className="action-btn accept-btn"
                onClick={() => onStatusUpdate(application._id, 'Accepted')}
              >
                Accept Application
              </button>
              <button 
                className="action-btn reject-btn"
                onClick={() => onStatusUpdate(application._id, 'Rejected')}
              >
                Reject Application
              </button>
            </>
          )}
          {onDelete && (
            <button 
              className="action-btn delete-btn-modal"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this application?')) {
                  onDelete(application._id);
                }
              }}
            >
              <FaTrash /> Delete Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;
