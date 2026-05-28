import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaList, FaTasks, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = () => {
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
    setIsOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default AdminSidebar;
