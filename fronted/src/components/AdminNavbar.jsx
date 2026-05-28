import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaList, FaTasks, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/add-hostel', icon: <FaPlusCircle />, label: 'Add Hostel' },
    { path: '/admin/my-hostels', icon: <FaList />, label: 'My Hostels' },
    { path: '/admin/applications', icon: <FaTasks />, label: 'Applications' },
    { path: '/admin/profile', icon: <FaUser />, label: 'Profile' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <div className="admin-navbar">
        <div className="admin-navbar-container">
          <div className="admin-navbar-title">
            <h2>Admin Panel</h2>
          </div>
          
          <button className="admin-nav-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`admin-nav-menu ${isOpen ? 'open' : ''}`}>
            {menuItems.map((item) => (
              <div
                key={item.path}
                className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
      
      {isOpen && <div className="admin-nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default AdminNavbar;
