import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentLogin } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await studentLogin(formData);
    if (result.token) {
      login(result.user, result.token);
      navigate('/hostels');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Student Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate('/student/register')}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
