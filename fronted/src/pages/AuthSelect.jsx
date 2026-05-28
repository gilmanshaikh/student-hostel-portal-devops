import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBuilding } from 'react-icons/fa';
import './AuthSelect.css';

const AuthSelect = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();

  return (
    <div className="auth-select-container">
      <div className="auth-select-card">
        <h2>Welcome to HostelHub</h2>
        <p className="auth-select-subtitle">Choose your account type to continue</p>
        
        <div className="mode-toggle">
          <button 
            className={mode === 'login' ? 'active' : ''} 
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button 
            className={mode === 'signup' ? 'active' : ''} 
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="role-selection">
          <div className="role-option" onClick={() => navigate(mode === 'login' ? '/student/login' : '/student/register')}>
            <div className="role-icon">
              <FaUserGraduate />
            </div>
            <h3>Student</h3>
            <p>Find and apply for hostels</p>
            <button className="role-btn">
              {mode === 'login' ? 'Login as Student' : 'Sign Up as Student'}
            </button>
          </div>

          <div className="role-option" onClick={() => navigate(mode === 'login' ? '/admin/login' : '/admin/register')}>
            <div className="role-icon">
              <FaBuilding />
            </div>
            <h3>Hostel Owner</h3>
            <p>Manage hostels and applications</p>
            <button className="role-btn">
              {mode === 'login' ? 'Login as Owner' : 'Sign Up as Owner'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSelect;
