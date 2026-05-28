import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaPlusCircle, FaTasks, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <img src={logo} alt="HostelHub Logo" className="logo-image" />
          <span className="logo-text">HostelHub</span>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <div className="navbar-user">
                <FaUser className="user-icon" />
                <span>{user.name}</span>
              </div>
              {user.role === 'student' && (
                <>
                  <button className="nav-btn nav-btn-primary" onClick={() => navigate('/hostels')}>
                    <FaHome />
                    <span>Browse Hostels</span>
                  </button>
                  <button className="nav-btn nav-btn-secondary" onClick={() => navigate('/my-applications')}>
                    <FaClipboardList />
                    <span>My Applications</span>
                  </button>
                  <button className="nav-btn nav-btn-secondary" onClick={() => navigate('/student/profile')}>
                    <FaUser />
                    <span>Profile</span>
                  </button>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <button className="nav-btn nav-btn-primary" onClick={() => navigate('/admin/dashboard')}>
                    <FaHome />
                    <span>Dashboard</span>
                  </button>
                  <button className="nav-btn nav-btn-secondary" onClick={() => navigate('/admin/my-hostels')}>
                    <FaClipboardList />
                    <span>My Hostels</span>
                  </button>
                  <button className="nav-btn nav-btn-secondary" onClick={() => navigate('/admin/applications')}>
                    <FaTasks />
                    <span>Applications</span>
                  </button>
                </>
              )}
              <button className="nav-btn nav-btn-logout" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button className="nav-btn nav-btn-outline" onClick={() => navigate('/auth-select')}>
                <FaSignInAlt />
                <span>Login</span>
              </button>
              <button className="nav-btn nav-btn-solid" onClick={() => navigate('/auth-select')}>
                <FaUserPlus />
                <span>Sign Up</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
