import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="HostelHub Logo" className="footer-logo-img" />
              <h3>HostelHub</h3>
            </div>
            <p className="footer-description">
              Your trusted platform for finding the perfect student accommodation. 
              Connecting students with quality hostels since 2025.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li onClick={() => navigate('/')}>Home</li>
              <li onClick={() => navigate('/hostels')}>Browse Hostels</li>
              <li onClick={() => navigate('/auth-select')}>Login / Sign Up</li>
              <li onClick={() => navigate('/my-applications')}>My Applications</li>
            </ul>
          </div>

          {/* For Owners */}
          <div className="footer-section">
            <h4>For Hostel Owners</h4>
            <ul className="footer-links">
              <li onClick={() => navigate('/admin/login')}>Owner Login</li>
              <li onClick={() => navigate('/admin/register')}>Register Your Hostel</li>
              <li onClick={() => navigate('/admin/add-hostel')}>Add Hostel</li>
              <li onClick={() => navigate('/admin/applications')}>Manage Applications</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>support@hostelhub.com</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+91 1234567890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 HostelHub. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
